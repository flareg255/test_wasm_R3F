use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PhysicsEngine {
    particles: Vec<f32>,
}

#[wasm_bindgen]
impl PhysicsEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(num: usize) -> Self {
        console_error_panic_hook::set_once();
        let mut p = Vec::with_capacity(num * 8);

        let mut rng = thread_rng();
        for _ in 0..num {
            p.push(rng.gen_range(-4.5..4.5));
            p.push(rng.gen_range(-4.5..4.5));
            p.push(rng.gen_range(-4.5..4.5));
            p.push(rng.gen_range(-0.02..0.02));
            p.push(rng.gen_range(-0.02..0.02));
            p.push(rng.gen_range(-0.02..0.02));
            p.push(rng.gen_range(0.0..6.28));
            p.push(rng.gen_range(0.0..1.0));
        }


        if p.len() != num * 8 {
            panic!(

                "Version Check Failed! Real size: {}, Expected: {}",
                p.len(),
                num * 8
            );
        }
        Self { particles: p }
    }

    pub fn update(&mut self) {
        if self.particles.len() % 8 != 0 {
            panic!("Data mismatch! Length is {}", self.particles.len());
        }

        let num = self.particles.len() / 8;


        let radius = 0.08;
        let wall_bounce = 0.8;
        let max_velocity = 0.04;
        let min_velocity = 0.01;
        let wall_limit = 8.0;

        for i in 0..num {
            for j in (i + 1)..num {
                let idx_i = i * 8;
                let idx_j = j * 8;


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
            let idx = i * 8;


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

    pub fn get_color_type(&self, index: usize) -> f32 {

        self.particles[index * 8 + 7]
    }

    pub fn get_brightness(&self, index: usize) -> f32 {
        let phase = self.particles[index * 8 + 6];
        phase.sin() * 0.4 + 0.6
    }


    pub fn get_x(&self, index: usize) -> f32 {

        self.particles[index * 8]
    }
    pub fn get_y(&self, index: usize) -> f32 {
        self.particles[index * 8 + 1]
    }
    pub fn get_z(&self, index: usize) -> f32 {
        self.particles[index * 8 + 2]
    }

    pub fn get_all_particles(&self) -> Vec<f32> {

        self.particles.clone()
    }
}
