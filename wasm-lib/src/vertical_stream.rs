use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct VerticalStreamEngine {
    particles: Vec<f32>,
}

#[wasm_bindgen]
impl VerticalStreamEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(num: usize) -> Self {
        console_error_panic_hook::set_once();
        let mut p = Vec::with_capacity(num * 8);

        let mut rng = thread_rng();
        for _ in 0..num {
            let theta: f32 = rng.gen_range(0.0..6.2831853);
            let r = 10.0 * rng.r#gen::<f32>().sqrt();
            p.push(r * theta.cos()); // x
            p.push(rng.gen_range(-10.0..10.0)); // y
            p.push(r * theta.sin()); // z
            
            p.push(0.0);
            p.push(rng.gen_range(0.02..0.08));
            p.push(0.0);

            p.push(rng.gen_range(0.0..6.28));
            p.push(rng.gen_range(0.0..1.0));
        }

        Self { particles: p }
    }

    pub fn update(&mut self) {
        let num = self.particles.len() / 8;
        let top_limit = 10.0;
        let bottom_reset = -10.0;
        let mut rng = thread_rng();

        for i in 0..num {
            let idx = i * 8;

            self.particles[idx + 1] += self.particles[idx + 4];

            self.particles[idx + 6] += 0.03;

            if self.particles[idx + 1] > top_limit {
                self.particles[idx + 1] = bottom_reset;
                let theta: f32 = rng.gen_range(0.0..6.2831853);
                let r = 10.0 * rng.r#gen::<f32>().sqrt();
                self.particles[idx] = r * theta.cos(); // x
                self.particles[idx + 2] = r * theta.sin(); // z
                self.particles[idx + 4] = rng.gen_range(0.02..0.08);
            }
        }
    }

    pub fn get_all_particles(&self) -> Vec<f32> {
        self.particles.clone()
    }
}
