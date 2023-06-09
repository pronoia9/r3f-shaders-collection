uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  for(float i = 0.0; i < 4.0; i++) {
          //uv = fract(uv * 1.5) - 0.5;
    uv = sin(uv * 2.0 + time);

    float d = length(uv) * exp(-length(uv0));
    vec3 col = palette(length(uv0) + i * 0.4 + time * 0.4);

    d = sin(d * 8.0 + time) / 8.0;
    d = abs(d);
    d = pow(0.015 / d, 2.0);
    finalColor += col * d;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}