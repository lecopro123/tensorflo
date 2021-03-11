export const rect = (detections, ctx) => {
    detections.forEach(pred => {
        //console.log(pred.bbox)
        const [x, y, width, height] = pred.bbox;
        const text = pred.class;

        const colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = colour;
        ctx.font = '18px Arial';
        ctx.fillStyle = colour;

        ctx.beginPath();
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    })
}