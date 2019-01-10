import React from 'react';
import PropTypes from 'prop-types';
import hexToRgb from 'hex-rgb';

import shapes from './shapes';
import { isValidHex } from './common';

class AvatarGenerator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentDidMount() {
    const { colors } = this.props;

    if (colors.length === 0) {
      console.warn('You need to add some colors in the color array!');
    }

    this.randomize();
  }

  componentDidUpdate(prevProps) {
    const { colors } = this.props;
    if (JSON.stringify(prevProps.colors) !== JSON.stringify(colors)) {
      this.randomize();
    }
  }

  collectCanvasSettings() {
    const { canvas } = this;
    const { width, height } = this.props;
    canvas.width = width * 4;
    canvas.height = height * 4;
    canvas.style.width = `${width * 1.5}px`;
    canvas.style.height = `${height * 1.5}px`;
    const mainCtx = canvas.getContext('2d');
    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');
    const textureCanvas = document.createElement('canvas');
    const textureCtx = textureCanvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const CX = W / 2;
    const CY = H / 2;
    const PI2 = 2 * Math.PI;
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    textureCanvas.width = bufferCanvas.width;
    textureCanvas.height = bufferCanvas.height;

    return {
      canvas,
      mainCtx,
      bufferCtx,
      textureCtx,
      W,
      H,
      CX,
      CY,
      PI2,
      textureCanvas,
      bufferCanvas,
    };
  }

  randomize() {
    const {
      mirrors,
      fade,
      zoom,
      rotation,
      amount,
      spacing,
      opacity,
      backgroundColor,
      backgroundOpacity,
    } = this.props;
    const t = Math.random() * 100000;
    const seg = Math.pow(2, Math.ceil(mirrors));
    const s = seg / 2;
    const {
      canvas,
      mainCtx,
      bufferCtx,
      textureCtx,
      W,
      H,
      CX,
      CY,
      PI2,
      textureCanvas,
      bufferCanvas,
    } = this.collectCanvasSettings();
    mainCtx.clearRect(0, 0, canvas.width, canvas.height);
    bufferCtx.clearRect(0, 0, W, H);
    textureCtx.clearRect(0, 0, W, H);
    bufferCtx.globalAlpha = fade;
    bufferCtx.save();
    bufferCtx.translate(CX, CY);
    bufferCtx.scale(1 + zoom / 100, 1 + zoom / 100);
    bufferCtx.rotate(rotation / 100);
    bufferCtx.translate(-CX, -CY);
    bufferCtx.drawImage(canvas, 0, 0);
    bufferCtx.restore();
    textureCtx.save();
    textureCtx.translate(CX, CY);
    textureCtx.beginPath();
    textureCtx.moveTo(0, 0);
    textureCtx.arc(0, 0, W, 0, PI2 / seg);
    textureCtx.lineTo(0, 0);
    textureCtx.clip();
    textureCtx.translate(-CX, -CY);
    textureCtx.globalAlpha = opacity;

    for (let n = 0; n < amount; n++) {
      const ti = t + n * spacing * 1000;
      this.draw(textureCtx, ti, n);
    }

    textureCtx.restore();
    textureCtx.globalAlpha = 1.0;
    textureCtx.save();
    textureCtx.translate(0, H);
    textureCtx.scale(1, -1);
    textureCtx.drawImage(textureCanvas, 0, 0, W, H);
    textureCtx.restore();
    bufferCtx.save();
    bufferCtx.globalAlpha = 1.0;

    for (let r = 0; r < s; r++) {
      bufferCtx.translate(CX, CY);
      bufferCtx.rotate(PI2 / s);
      bufferCtx.translate(-CX, -CY);
      bufferCtx.drawImage(textureCanvas, 0, 0, W, H, 0, 0, W, H);
    }

    bufferCtx.restore();
    mainCtx.save();
    const { red, green, blue } = hexToRgb(backgroundColor);
    mainCtx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${backgroundOpacity})`;
    mainCtx.fillRect(0, 0, canvas.width, canvas.height);
    mainCtx.translate(CX, CY);
    mainCtx.translate(-CX, -CY);
    mainCtx.drawImage(bufferCanvas, 0, 0);
    mainCtx.restore();
  }

  draw(ctx, t, n) {
    const {
      wavelength,
      sizing,
      shape,
      colors,
    } = this.props;
    const { canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const CX = W / 2;
    const CY = H / 2;
    const colorIndex = Math.floor(Math.random() * colors.length - 1) + 0;
    const color = colors[colorIndex];
    const rotation = t / 2000;

    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(rotation);
    ctx.fillStyle = color;

    const ss = wavelength;
    const size = sizing / 10 * (
      (1 + Math.sin(t / 911 * ss)) * CX * 0.3
      + (1 + Math.cos(t / 701 * ss)) * CX * 0.2
      + (1 + Math.sin(t / 503 * ss)) * CX * 0.1);
    const x = Math.sin(t / (n + 787) * ss) * CX * 0.37;
    const y = Math.sin(t / (n + 997) * ss) * CY * 0.13;

    shapes[shape](ctx, x, y, size);
    ctx.fill();
    ctx.restore();
  }

  isValidHex(hex) {
    return isValidHex(hex);
  }

  render() {
    return (
      <canvas
        ref={(el) => {
          this.canvas = el;
        }}
      />
    );
  }
}

AvatarGenerator.defaultProps = {
  width: 200,
  height: 200,
  mirrors: 3,
  zoom: 0.2,
  rotation: 0.3,
  fade: 1,
  opacity: 0.3,
  amount: 16,
  spacing: 20,
  wavelength: 2,
  sizing: 4,
  shape: 'circle',
  backgroundColor: '#fff',
  backgroundOpacity: 0.3,
  colors: [],
};

AvatarGenerator.propTypes = {
  colors: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  mirrors: PropTypes.number,
  zoom: PropTypes.number,
  rotation: PropTypes.number,
  fade: PropTypes.number,
  opacity: PropTypes.number,
  amount: PropTypes.number,
  spacing: PropTypes.number,
  wavelength: PropTypes.number,
  sizing: PropTypes.number,
  shape: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.number,
};

export default AvatarGenerator;
