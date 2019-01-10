const circle = (ctx, x, y, r) => {
  const PI2 = 2 * Math.PI;
  r = Math.abs(r);
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, PI2);
  ctx.restore();
};

const triangle = (ctx, x, y, size) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(size / 2, 0);
  ctx.lineTo(-size / 2, 0);
  ctx.lineTo(0, size);
  ctx.restore();
};

const square = (ctx, x, y, size) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(size, size);
  ctx.lineTo(size, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, size);
  ctx.restore();
};

export default ({
  circle,
  triangle,
  square,
});
