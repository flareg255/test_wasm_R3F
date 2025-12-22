use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_rotation(time: f64) -> f64 {
    time.sin() * 2.0
}
