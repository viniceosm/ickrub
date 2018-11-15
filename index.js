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
	})

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

	rotateHorarioArray(a) {
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
	}

	rotateAntiHorarioArray(a) {
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
	}

	getFaces() {
		return this.faces;
	}

	// move U horario
	u() {
		this.rotateHorarioArray(this.faces.u);
		let lInicial = this.faces.l.slice(0);

		this.faces.l[0] = this.faces.b[0];
		this.faces.b[0] = this.faces.r[0];
		this.faces.r[0] = this.faces.f[0];
		this.faces.f[0] = lInicial[0];
	}

	// move D horario
	d() {
		this.rotateHorarioArray(this.faces.d);
		let lInicial = this.faces.l.slice(0);

		this.faces.l[2] = this.faces.b[2];
		this.faces.b[2] = this.faces.r[2];
		this.faces.r[2] = this.faces.f[2];
		this.faces.f[2] = lInicial[2];
	}

	// move L horario
	l() {
		this.rotateHorarioArray(this.faces.l);
	}

	// move R horario
	r() {
		this.rotateHorarioArray(this.faces.r);
	}

	// move F horario
	f() {
		this.rotateHorarioArray(this.faces.f);
	}

	// move B horario
	b() {
		this.rotateHorarioArray(this.faces.b);
	}

	// move U anti horario = horario * 3
	ua() {
		for (let i = 0; i < 3; i++)
			this.u();
	}

	// move D anti horario = horario * 3
	da() {
		for (let i = 0; i < 3; i++)
			this.d();
	}

	// move L anti horario = horario * 3
	la() {
		for (let i = 0; i < 3; i++)
			this.l();
	}

	// move R anti horario = horario * 3
	ra() {
		for (let i = 0; i < 3; i++)
			this.r();
	}

	// move F anti horario = horario * 3
	fa() {
		for (let i = 0; i < 3; i++)
			this.f();
	}

	// move B anti horario = horario * 3
	ba() {
		for (let i = 0; i < 3; i++)
		this.b();
	}
}

let cube = new Cubo();

cube.u();
cube.u();

cube.d();
cube.d();

console.log(cube.getFaces());