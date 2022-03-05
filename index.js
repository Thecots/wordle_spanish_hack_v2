const sect1 = document.querySelector('.flettersgp div'),
  lista = document.querySelector('.list');
const gray = '#787c7e', yellow = '#c9b458', green = '#6aaa64';

const pg = [], py = [], pm = [];


async function doit() {
  palabra = await load();
  let g = '';

  pg.forEach(d => {
    g += d.letter;
    palabra = palabra.filter((n, i) => {
      if (n[d.position].includes(d.letter)) {
        return n;
      };
    });
  });

  py.forEach(d => {
    g += d.letter;
    palabra = palabra.filter((n, i) => {
      if (n.includes(d.letter) && !n[d.position].includes(d.letter)) {
        return n;
      };
    });
  });

  
  pm.forEach(d => {
    console.log(g);
    palabra = palabra.filter((n, i) => {
     if(!g.includes(d.letter)){
      if(!n.includes(d.letter)){
        return n;
      }
     }else{
      if(!n[pg.position].includes(d.letter)){
        return n;
      }
     }
    });
  });
  
  let template = '';
  palabra.forEach((n, i) => {
    template += i == palabra.length - 1 ? `<p>${n}.</p>` : `<p>${n},</p> `;
  });

  let t = `${palabra.length} Palabras encontradas`;
  if (palabra.length == 1) {
    t = '1 Palabra encontrada';
  };

  lista.innerHTML = `<header><h1>${t}</h1></header><div>${template}</div>`;
}

/* load json */
async function load() {
  palabra = await (await fetch('./palabras.json')).json();
  return palabra;
}

/* info */
function info() {
  document.querySelector('.info').classList.toggle('active');
}
document.querySelector('.info').addEventListener('click', () => {
  info()
})



window.addEventListener('keyup', e => {
  /* escribir */
  if ('qwertyuiopñlkjhgfdsazxcvbnm'.includes(e.key.toLowerCase())) {
    for (let i = 0; i < 5; i++) {
      if (sect1.children[sect1.childElementCount - 1].children[i].children[0].value == '') {
        sect1.children[sect1.childElementCount - 1].children[i].children[0].value = e.key.toLowerCase();
        for (let e = 1; e < 4; e++) {
          sect1.children[sect1.childElementCount - 1].children[i].children[e].classList.remove('cdis')
        }
        i = 5;
      }

    }
  }

  /* enter */
  if (e.keyCode == 13) {
    if (checkRowComplete()) {
      for (let i = 0; i < 5; i++) {
        switch (sect1.children[sect1.childElementCount - 1].children[i].children[0].style.background) {
          case 'rgb(106, 170, 100)':
            pg.push({ letter: sect1.children[sect1.childElementCount - 1].children[i].children[0].value, position: i })
            break;
          case 'rgb(201, 180, 88)':
            py.push({ letter: sect1.children[sect1.childElementCount - 1].children[i].children[0].value, position: i })
            break;
          case 'rgb(120, 124, 126)':
            pm.push({ letter: sect1.children[sect1.childElementCount - 1].children[i].children[0].value, position: i })
            break;
        }
        for (let e = 1; e < 4; e++) {
          sect1.children[sect1.childElementCount - 1].children[i].children[e].classList.add('cdis')
        }
      }

      sect1.insertAdjacentHTML('beforeend', `<section> <div> <input type="text" disabled maxlength="1"> <div onclick="letterstate('gray',1)" class="gray cdis"></div><div onclick="letterstate('yellow',1)" class="yellow cdis"></div><div onclick="letterstate('green',1)" class="green cdis"></div></div><div> <input type="text" disabled maxlength="1"> <div onclick="letterstate('gray',2)" class="gray cdis"></div><div onclick="letterstate('yellow',2)" class="yellow cdis"></div><div onclick="letterstate('green',2)" class="green cdis"></div></div><div> <input type="text" disabled maxlength="1"> <div onclick="letterstate('gray',3)" class="gray cdis"></div><div onclick="letterstate('yellow',3)" class="yellow cdis"></div><div onclick="letterstate('green',3)" class="green cdis"></div></div><div> <input type="text" disabled maxlength="1"> <div onclick="letterstate('gray',4)" class="gray cdis"></div><div onclick="letterstate('yellow',4)" class="yellow cdis"></div><div onclick="letterstate('green',4)" class="green cdis"></div></div><div> <input type="text" disabled maxlength="1"> <div onclick="letterstate('gray',5)" class="gray cdis"></div><div onclick="letterstate('yellow',5)" class="yellow cdis"></div><div onclick="letterstate('green',5)" class="green cdis"></div></div></section> `);

      doit();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Linea incompleta',
      })
    }
  }

  /* borrar */
  if (e.keyCode == 8) {
    for (let i = 4; i >= 0; i--) {
      if (sect1.children[sect1.childElementCount - 1].children[i].children[0].value != '') {
        sect1.children[sect1.childElementCount - 1].children[i].children[0].value = '';
        sect1.children[sect1.childElementCount - 1].children[i].children[0].style.color = '#000';
        sect1.children[sect1.childElementCount - 1].children[i].children[0].style.background = '#ffff';
        for (let e = 1; e < 4; e++) {
          sect1.children[sect1.childElementCount - 1].children[i].children[e].classList.add('cdis')
        }
        i = -1;
      }

    }
  }
})

/* cambiar color a letra */
function letterstate(e, i) {
  switch (e) {
    case 'gray':
      sect1.children[sect1.childElementCount - 1].children[i - 1].children[0].style.background = gray;
      break;
    case 'yellow':
      sect1.children[sect1.childElementCount - 1].children[i - 1].children[0].style.background = yellow;
      break;
    case 'green':
      sect1.children[sect1.childElementCount - 1].children[i - 1].children[0].style.background = green;
      break;
  }
  sect1.children[sect1.childElementCount - 1].children[i - 1].children[0].style.color = '#ffff';
}

/* comprobar si fila esta completa */
function checkRowComplete() {
  for (let i = 0; i < 5; i++) {
    if (sect1.children[sect1.childElementCount - 1].children[i].children[0].style.color != 'rgb(255, 255, 255)') {
      return false;
    }
  }
  return true;
}