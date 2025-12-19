use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PhysicsEngine {
    particles: Vec<f32>,
    num_particles: usize,
}

#[wasm_bindgen]
impl PhysicsEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(num: usize) -> Self {
        // 1粒子あたり7つの要素 [x, y, z, vx, vy, vz, phase]
        // 確実に num * 7 分のデータを初期化する
        let mut p = Vec::with_capacity(num * 7);
        let mut rng = thread_rng();
        for _ in 0..num {
            p.push(rng.gen_range(-4.5..4.5)); // x
            p.push(rng.gen_range(-4.5..4.5)); // y
            p.push(rng.gen_range(-4.5..4.5)); // z
            p.push(rng.gen_range(-0.02..0.02)); // vx
            p.push(rng.gen_range(-0.02..0.02)); // vy
            p.push(rng.gen_range(-0.02..0.02)); // vz
            p.push(rng.gen_range(0.0..6.28)); // phase (明滅用)
        }
        Self {
            particles: p,
            num_particles: num,
        }
    }

    pub fn update(&mut self) {
        let num = self.num_particles;
        let radius = 0.08;
        let wall_bounce = 0.8;
        let max_velocity = 0.04;
        let min_velocity = 0.01;
        let wall_limit = 8.0;

        for i in 0..num {
            for j in (i + 1)..num {
                let idx_i = i * 7;
                let idx_j = j * 7;

                let dx = self.particles[idx_i] - self.particles[idx_j];
                let dy = self.particles[idx_i + 1] - self.particles[idx_j + 1];
                let dz = self.particles[idx_i + 2] - self.particles[idx_j + 2];
                let dist_sq = dx * dx + dy * dy + dz * dz;
                let min_dist = radius * 2.0;

                if dist_sq < min_dist * min_dist && dist_sq > 0.0 {
                    let dist = dist_sq.sqrt();
                    let nx = dx / dist;
                    let ny = dy / dist;
                    let nz = dz / dist;
                    let dvx = self.particles[idx_i + 3] - self.particles[idx_j + 3];
                    let dvy = self.particles[idx_i + 4] - self.particles[idx_j + 4];
                    let dvz = self.particles[idx_i + 5] - self.particles[idx_j + 5];
                    let p = dvx * nx + dvy * ny + dvz * nz;

                    if p < 0.0 {
                        let impulse = p * 0.8;
                        self.particles[idx_i + 3] -= impulse * nx;
                        self.particles[idx_i + 4] -= impulse * ny;
                        self.particles[idx_i + 5] -= impulse * nz;
                        self.particles[idx_j + 3] += impulse * nx;
                        self.particles[idx_j + 4] += impulse * ny;
                        self.particles[idx_j + 5] += impulse * nz;
                    }
                }
            }
        }

        for i in 0..num {
            let idx = i * 7;

            self.particles[idx] += self.particles[idx + 3];
            self.particles[idx + 1] += self.particles[idx + 4];
            self.particles[idx + 2] += self.particles[idx + 5];

            for j in 0..3 {
                if self.particles[idx + j].abs() > wall_limit {
                    self.particles[idx + j] = self.particles[idx + j].signum() * wall_limit;
                    self.particles[idx + j + 3] *= -wall_bounce;
                }
            }

            let vx = self.particles[idx + 3];
            let vy = self.particles[idx + 4];
            let vz = self.particles[idx + 5];
            let speed = (vx * vx + vy * vy + vz * vz).sqrt();

            if speed > max_velocity {
                let scale = max_velocity / speed;
                self.particles[idx + 3] *= scale;
                self.particles[idx + 4] *= scale;
                self.particles[idx + 5] *= scale;
            } else if speed < min_velocity && speed > 0.0 {
                let scale = min_velocity / speed;
                self.particles[idx + 3] *= scale;
                self.particles[idx + 4] *= scale;
                self.particles[idx + 5] *= scale;
            }

            self.particles[idx + 6] += 0.03;
        }
    }

    pub fn get_brightness(&self, index: usize) -> f32 {
        let phase = self.particles[index * 7 + 6];
        phase.sin() * 0.4 + 0.6
    }

    pub fn get_x(&self, index: usize) -> f32 {
        self.particles[index * 7]
    }
    pub fn get_y(&self, index: usize) -> f32 {
        self.particles[index * 7 + 1]
    }
    pub fn get_z(&self, index: usize) -> f32 {
        self.particles[index * 7 + 2]
    }
}
