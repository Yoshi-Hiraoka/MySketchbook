'use strict';

{

    const canvas = document.getElementById('myCanvas');

    if (screen.width < 860) {
        canvas.width = 800 * screen.width / 860;
        canvas.height = 600 * screen.width / 860;
    }

    const ctx = canvas.getContext('2d');

    const color = document.getElementById('color');
    const thickness = document.getElementById('thickness');
    const erase = document.getElementById('erase');
    const eraser = document.getElementById('eraser');
    const save = document.getElementById('save');
    const gallery = document.getElementById('gallery');

    let startX;
    let startY;
    let x;
    let y;
    const border = 20;

    let currentColor = 'black';

    let isDrawing = false;

    const width = canvas.width;
    const height = canvas.height;

    //ダウンロードした画像の背景が黒い問題の解決策/ canvasの背景をfillStyleで白く塗りつぶす
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    function draw() {
      canvas.addEventListener('mousedown', e => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
      });
      canvas.addEventListener('mousemove', e => {
        if (!isDrawing) {
          return;
        }
        x = e.offsetX;
        y = e.offsetY;
        ctx.beginPath();
        ctx.strokeStyle = currentColor;
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        startX = x;
        startY = y;
      });

      canvas.addEventListener('mouseup', () => {
        isDrawing = false;
      });

      canvas.addEventListener('mouseout', () => {
        isDrawing = false;
      });

      color.addEventListener('change', e => {
        currentColor = e.target.value;
      });

      thickness.addEventListener('change', e => {
        ctx.lineWidth = e.target.value;
      });

      erase.addEventListener('click', () => {
        const clear = window.confirm('本当に削除しますか？');
        if (!clear) {
          return;
        } else {
          ctx.clearRect(0, 0, width, height);
          //削除した後に白く塗り直して背景が黒くならないように
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }
      });
    }

    eraser.addEventListener('click', () => {
      canvas.classList.add('eraser-mode');
      currentColor = 'white';
      ctx.lineWidth = eraser.value;
    });
    eraser.addEventListener('dblclick', () => {
      canvas.classList.remove('eraser-mode');
      color.value = 'black'
      thickness.value = '1';
      currentColor = 'black';
      ctx.lineWidth = '1';
    });

    save.addEventListener('click', () => {
      const img = document.createElement('img');
      const thumbnail = canvas.toDataURL('image/png');
      img.src = thumbnail;
      img.classList.add('thumbnails');
      const a = document.createElement('a');
      //サムネをクリックするとファイルが見つかりませんでしたとなってダウンロードできない問題
      //type属性を以下に指定したらダウンロードできるようになった。
      //参考url= http://wordpress.ideacompo.com/?p=12888
      a.type = "application/octet-stream";
      a.download = new Date().getTime() + '.png';
      a.href = a.href = canvas.toDataURL("image/png");
      gallery.appendChild(a);
      a.appendChild(img);
    });

    draw();
}
