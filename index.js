class Cubo {
	constructor () {
		this.cores = {};

		Object.assign(this.cores, {
			verde: 'green',
			azul: 'blue',
			laranja: 'orange',
			vermelho: 'red',
			branco: 'white',
			amarelo: 'yellow',
		});

		this.faces = {
			// up
			u: [[this.cores.verde, this.cores.verde, this.cores.verde],
				[this.cores.verde, this.cores.verde, this.cores.verde],
				[this.cores.verde, this.cores.verde, this.cores.verde]],

			// down
			d: [[this.cores.azul, this.cores.azul, this.cores.azul],
				[this.cores.azul, this.cores.azul, this.cores.azul],
				[this.cores.azul, this.cores.azul, this.cores.azul]],

			// left
			l: [[this.cores.laranja, this.cores.laranja, this.cores.laranja],
				[this.cores.laranja, this.cores.laranja, this.cores.laranja],
				[this.cores.laranja, this.cores.laranja, this.cores.laranja],],

			// right
			r: [[this.cores.vermelho, this.cores.vermelho, this.cores.vermelho],
				[this.cores.vermelho, this.cores.vermelho, this.cores.vermelho],
				[this.cores.vermelho, this.cores.vermelho, this.cores.vermelho]],

			// front
			f: [[this.cores.branco, this.cores.branco, this.cores.branco],
				[this.cores.branco, this.cores.branco, this.cores.branco],
				[this.cores.branco, this.cores.branco, this.cores.branco]],

			// back
			b: [[this.cores.amarelo, this.cores.amarelo, this.cores.amarelo],
				[this.cores.amarelo, this.cores.amarelo, this.cores.amarelo],
				[this.cores.amarelo, this.cores.amarelo, this.cores.amarelo]]
		}
	}

	rotateHorarioArray (aThis) {
		let a = aThis.slice(0);
		let n = a.length;
		for (let i = 0; i < n / 2; i++) {
			for (let j = i; j < n - i - 1; j++) {
				let tmp = a[i][j];
				a[i][j] = a[n - j - 1][i];
				a[n - j - 1][i] = a[n - i - 1][n - j - 1];
				a[n - i - 1][n - j - 1] = a[j][n - i - 1];
				a[j][n - i - 1] = tmp;
			}
		}

		this.aThis = a;
	}

	rotateAntiHorarioArray (aThis) {
		let a = aThis.slice(0);
		let n = a.length;
		for (let i = 0; i < n / 2; i++) {
			for (let j = i; j < n - i - 1; j++) {
				let tmp = a[i][j];
				a[i][j] = a[j][n - i - 1];
				a[j][n - i - 1] = a[n - i - 1][n - j - 1];
				a[n - i - 1][n - j - 1] = a[n - j - 1][i];
				a[n - j - 1][i] = tmp;
			}
		}

		this.aThis = a;
	}

	getFaces () {
		return Object.assign({}, this.faces);
	}

	// move U horario
	u () {
		let newFaces = {};
		newFaces = Object.assign({}, this.faces);

		this.rotateHorarioArray(this.faces.u);
		let lInicial = this.faces.l.slice(0);

		newFaces.l[0] = this.faces.b[0];
		newFaces.b[0] = this.faces.r[0];
		newFaces.r[0] = this.faces.f[0];
		newFaces.f[0] = lInicial[0];

		this.faces = newFaces;
		this.paintDivs();
	}

	// move D horario
	d () {
		let newFaces = {};
		newFaces = Object.assign({}, this.faces);

		this.rotateHorarioArray(this.faces.d);
		let lInicial = this.faces.l.slice(0);

		newFaces.l[2] = this.faces.b[2];
		newFaces.b[2] = this.faces.r[2];
		newFaces.r[2] = this.faces.f[2];
		newFaces.f[2] = lInicial[2];

		this.faces = newFaces;
		this.paintDivs();
	}

	// move R horario
	r () {
		let newFaces = {};
		let uInicial = [[], [], []];
		let jTroca = 2;

		newFaces = Object.assign(newFaces, this.faces);

		// fui obrigado a fazer essas 3 linhas, infelizmente
		uInicial[0][jTroca] = this.faces.u[0][jTroca];
		uInicial[1][jTroca] = this.faces.u[1][jTroca];
		uInicial[2][jTroca] = this.faces.u[2][jTroca];

		this.rotateHorarioArray(this.faces.r);

		this.repeat(0, 3, i => { newFaces.u[i][jTroca] = this.faces.f[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.f[i][jTroca] = this.faces.d[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.d[i][jTroca] = this.faces.b[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.b[i][jTroca] = uInicial[i][jTroca] });

		this.faces = newFaces;
		this.paintDivs();
	}

	// move L horario
	l () {
		let newFaces = {};
		let uInicial = [[], [], []];
		let jTroca = 0;

		newFaces = Object.assign(newFaces, this.faces);

		// fui obrigado a fazer essas 3 linhas, infelizmente
		uInicial[0][jTroca] = this.faces.u[0][jTroca];
		uInicial[1][jTroca] = this.faces.u[1][jTroca];
		uInicial[2][jTroca] = this.faces.u[2][jTroca];

		this.rotateHorarioArray(this.faces.l);

		this.repeat(0, 3, i => { newFaces.u[i][jTroca] = this.faces.b[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.b[i][jTroca] = this.faces.d[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.d[i][jTroca] = this.faces.f[i][jTroca] });
		this.repeat(0, 3, i => { newFaces.f[i][jTroca] = uInicial[i][jTroca] });

		this.faces = newFaces;
		this.paintDivs();
	}

	// move F horario
	f () {
		let newFaces = {};
		let uInicial = [[], [], []];

		newFaces = Object.assign(newFaces, this.faces);

		// fui obrigado a fazer essas 3 linhas, infelizmente
		uInicial[2][0] = this.faces.u[2][0];
		uInicial[2][1] = this.faces.u[2][1];
		uInicial[2][2] = this.faces.u[2][2];

		this.rotateHorarioArray(this.faces.f);

		newFaces.u[2][2] = this.faces.l[0][2];
		newFaces.u[2][1] = this.faces.l[1][2];
		newFaces.u[2][0] = this.faces.l[2][2];

		newFaces.l[2][2] = this.faces.d[0][2];
		newFaces.l[1][2] = this.faces.d[0][1];
		newFaces.l[0][2] = this.faces.d[0][0];

		newFaces.d[0][0] = this.faces.r[0][0];
		newFaces.d[0][1] = this.faces.r[1][0];
		newFaces.d[0][2] = this.faces.r[2][0];

		newFaces.r[0][0] = uInicial[2][0];
		newFaces.r[1][0] = uInicial[2][1];
		newFaces.r[2][0] = uInicial[2][2];

		this.faces = newFaces;
		this.paintDivs();
	}

	// move B horario
	b () {
		let newFaces = {};
		let uInicial = [[], [], []];

		newFaces = Object.assign(newFaces, this.faces);

		// fui obrigado a fazer essas 3 linhas, infelizmente
		uInicial[0][0] = this.faces.u[0][0];
		uInicial[0][1] = this.faces.u[0][1];
		uInicial[0][2] = this.faces.u[0][2];

		this.rotateHorarioArray(this.faces.b);

		newFaces.u[0][2] = this.faces.l[0][0];
		newFaces.u[0][1] = this.faces.l[1][0];
		newFaces.u[0][0] = this.faces.l[2][0];

		newFaces.l[0][0] = this.faces.d[2][0];
		newFaces.l[1][0] = this.faces.d[2][1];
		newFaces.l[2][0] = this.faces.d[2][2];

		newFaces.d[2][0] = this.faces.r[0][2];
		newFaces.d[2][1] = this.faces.r[1][2];
		newFaces.d[2][2] = this.faces.r[2][2];

		newFaces.r[0][2] = uInicial[0][0];
		newFaces.r[1][2] = uInicial[0][1];
		newFaces.r[2][2] = uInicial[0][2];

		this.faces = newFaces;
		this.paintDivs();
	}

	// move U anti horario = horario * 3
	ua () {
		for (let i = 0; i < 3; i++)
			this.u();
	}

	// move D anti horario = horario * 3
	da () {
		for (let i = 0; i < 3; i++)
			this.d();
	}

	// move L anti horario = horario * 3
	la () {
		for (let i = 0; i < 3; i++)
			this.l();
	}

	// move R anti horario = horario * 3
	ra () {
		for (let i = 0; i < 3; i++)
			this.r();
	}

	// move F anti horario = horario * 3
	fa () {
		for (let i = 0; i < 3; i++)
			this.f();
	}

	// move B anti horario = horario * 3
	ba () {
		for (let i = 0; i < 3; i++)
			this.b();
	}

	repeat (min, max, fn) {
		for (let i = min; i < max; i++)
			fn(i)
	}

	showFacesColored () {
		for (var [k, v] of Object.entries(this.getFaces()) ) {
			logpty.b(['', '' + k + '\n '],
				[v[0][0], '[]'], [v[0][1], '[]'], [v[0][2], '[]'], ['', '\n '],
				[v[1][0], '[]'], [v[1][1], '[]'], [v[1][2], '[]'], ['', '\n '],
				[v[2][0], '[]'], [v[2][1], '[]'], [v[2][2], '[]'], ['', '\n ']
			);
		}
	}

	paintDivs() {
		for (var [k, v] of Object.entries(this.getFaces())) {
			this.repeat(0, 3, i => {
				this.repeat(0, 3, j => {
					try {
						document.querySelector(`#${k} div[class^="${i}x${j}"]`).style.backgroundColor = v[i][j];
					} catch (e) {
						console.error(e);
						console.error(`Selector: #${k} div[class^="${i}x${j}"]`);
					}
				});
			});
		}
	}

	shuffle() {
		this.repeat(0, 20, i => {
			let moves = ['u', 'd', 'b', 'f', 'r', 'l'];
			moves = [...moves, ...moves.map(v => v + 'a')]; // concat movimentos com movimentos anti horarios

			let indexMove = Math.floor(Math.random() * moves.length) + 0;

			this[moves[indexMove]]();
		});

		this.paintDivs();
	}
}

let cube = new Cubo();

window.addEventListener('load', function () {
	cube.shuffle();
});