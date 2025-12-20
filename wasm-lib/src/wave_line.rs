use rand::prelude::*;
use wasm_bindgen::prelude::*;

struct WaveLine {

    speed: f32,
    y_offset: f32,
    z_offset: f32,
    width: f32,
    segments: usize,
    wave_data: Vec<f32>,
}

#[wasm_bindgen]
pub struct WaveLineEngine {

    lines: Vec<WaveLine>,
}

#[wasm_bindgen]
impl WaveLineEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(count: usize, segments: usize, width: f32) -> Self {
        let mut rng = thread_rng();
        let mut lines = Vec::with_capacity(count);

        for _ in 0..count {
            lines.push(WaveLine {
                speed: rng.gen_range(0.3..0.8),
                y_offset: rng.gen_range(-0.5..0.5),

                z_offset: rng.gen_range(-2.0..2.0),
                width,
                segments,
                wave_data: vec![0.0; segments + 1],
            });
        }

        Self { lines }
    }

    pub fn update(&mut self, time: f32) {
        for line in &mut self.lines {
            let step = line.width / (line.segments as f32);

            for i in 0..=line.segments {
                let x = (i as f32 * step) - (line.width / 2.0);

                let t = time * line.speed;

                let wave1 = (x * 0.4 + t).sin() * 0.6;
                let wave2 = (x * 1.5 + t * 1.2).sin() * 0.15;

                line.wave_data[i] = wave1 + wave2 + line.y_offset;
            }
        }
    }

    pub fn get_wave_values(&self, line_index: usize) -> *const f32 {
        self.lines[line_index].wave_data.as_ptr()
    }

    pub fn get_z_offset(&self, line_index: usize) -> f32 {
        self.lines[line_index].z_offset
    }
}
