Vue.component('materias',{
    data:()=>{
        return{
            buscar: '',
                alumnos: [],
                alumno: {
                    accion: 'nuevo',
                    mostrar_msg: false,
                    msg: '',
                    idAlumno: '',              
                    codigo: '',
                    carrera: '',
                    mat1:'',
                    mat2:'',
                    mat3:'',
                    mat4:'',
                    mat5:''
            }
        }
    },
    methods:{
        buscandoAlumno() {
            this.obtenerAlumnos(this.buscar);
            /*
            //console.log(this.buscar);
            this.alumnos.filter(alumno => {
                if(alumno.nombres.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1){
                    return alumno;
                }
            });
            */
        },
        eliminarAlumno(alumno) {
            let sql = '',
                parametros = [];
            if (confirm(`Estas a punto de ELIMINAR las materias del alumno ${this.alumno.nombres}`)) {
                this.alumno.idAlumno = alumno.idAlumno;
                this.alumno.accion = 'eliminar';  
                this.guardarAlumno();

                sql = 'UPDATE alumnos SET mat1="No Cursando", mat2="No Cursando", mat3="No cursando", mat4="No Cursando", mat5="No Cursando" WHERE idAlumno=?';
                parametros = [this.alumno.mat1, this.alumno.mat2, this.alumno.mat3, this.alumno.mat4, this.alumno.mat5, this.alumno.idAlumno];
                
            }
            
           
        },
        modificarAlumno(datos) {
            this.alumno = JSON.parse(JSON.stringify(datos));
            this.alumno.accion = 'modificar';
            
        },
        guardarAlumno() {
            var num = "1"
            nombrealumno = this.alumno.nombres;
            let sql = '',
                parametros = [];
            switch(num == "1")
            {
            case (this.alumno.mat1 == "1"):                      
                sql = 'UPDATE alumnos SET mat1=" LU 7:00am a 8:50am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat1
            }
            switch(num == "1")
            {
            case (this.alumno.mat1 == "2"):                      
                sql = 'UPDATE alumnos SET mat1=" LU 1:00pm a 2:30pm" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat1
            }
            switch(num == "1")
            {
            case (this.alumno.mat1 == "3"):                      
                sql = 'UPDATE alumnos SET mat1="No Cursa" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat1
            }

            //Para la 2 materia
            switch(num == "1")
            {
            case (this.alumno.mat2 == "1"):                      
                sql = 'UPDATE alumnos SET mat2=" MA 10:30am a 12:20am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat2
            }
            switch(num == "1")
            {
            case (this.alumno.mat2 == "2"):                      
                sql = 'UPDATE alumnos SET mat2=" MI 1:00pm a 2:30pm" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat2
            }
            switch(num == "1")
            {
            case (this.alumno.mat2 == "3"):                      
                sql = 'UPDATE alumnos SET mat2="No Cursa" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat2
            }
            
            //Para la 3 materia
            switch(num == "1")
            {
            case (this.alumno.mat3 == "1"):                      
                sql = 'UPDATE alumnos SET mat3="JU 8:40am a 10:30am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat3
            }
            switch(num == "1")
            {
            case (this.alumno.mat3 == "2"):                      
                sql = 'UPDATE alumnos SET mat3="JU 7:00am a 8:40am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat3
            }
            switch(num == "1")
            {
            case (this.alumno.mat3 == "3"):                      
                sql = 'UPDATE alumnos SET mat3="No Cursa" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat3
            }

            //Para la 4 materia
            switch(num == "1")
            {
            case (this.alumno.mat4 == "1"):                      
                sql = 'UPDATE alumnos SET mat4="MI 7:00am a 8:30am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat4
            }
            switch(num == "1")
            {
            case (this.alumno.mat4 == "2"):                      
                sql = 'UPDATE alumnos SET mat4="MI 8:40am a 10:30am" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat4
            }
            switch(num == "1")
            {
            case (this.alumno.mat4 == "3"):                      
                sql = 'UPDATE alumnos SET mat4="No Cursa" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat4
            }

            //Para la 5 materia
            switch(num == "1")
            {
            case (this.alumno.mat5 == "1"):                      
                sql = 'UPDATE alumnos SET mat5="JU 10:40am a 12:20pm" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat5
            }
            switch(num == "1")
            {
            case (this.alumno.mat5 == "2"):                      
                sql = 'UPDATE alumnos SET mat5="JU 1:00pm a 2:30pm" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat5
            }
            switch(num == "1")
            {
            case (this.alumno.mat5 == "3"):                      
                sql = 'UPDATE alumnos SET mat5="No Cursa" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.mat5
            }

            db_sistema.transaction(tx => {
                tx.executeSql(sql,
                    parametros,
                    (tx, res) => {
                        this.nuevoAlumno();
                        this.obtenerAlumnos();
                        this.alumno.mostrar_msg = true;
                        if (numselec == "4") {
                            this.alumno.msg = `Se anuló la matricula del alumno ${nombrealumno}`;
                        } else {
                            this.alumno.msg = `Las materias del alumno ${nombrealumno} ha sido matriculadas con exito.`;
                        }
                    },
                    (tx, err) => {
                        this.alumno.mostrar_msg = true;
                        this.alumno.msg = `Error al matricular las materias del Alumno: ${err.message}`;
                    });
            });
        },
        obtenerAlumnos(valor = '') {
            let respuesta = db_sistema.transaction(tx => {
                tx.executeSql(`SELECT * FROM alumnos WHERE nombres like "%${valor}%" OR codigo like "%${valor}%" OR apellidos like"%${valor}%" ORDER BY apellidos`, [], (index, datos) => {
                    this.alumnos = [];
                    for (let i = 0; i < datos.rows.length; i++) {
                        this.alumnos.push(datos.rows[i]);
                    }
                });
            });
        },
        nuevoAlumno() {
            this.alumno.accion = 'nuevo';
            this.alumno.msg = '';               
            this.alumno.codigo = '';
            this.alumno.carrera = '';
            this.alumno.mat1='';
            this.alumno.mat2='';
            this.alumno.mat3='';
            this.alumno.mat4='';
            this.alumno.mat5='';

        }
    },
    created() {
        this.obtenerAlumnos();
    },
    template:`

    <div class="appSistema" id="appSistema">

        <div class="container-fluid w-75 bg-warning mt-4 ">
            <div id="carAlumno">

                <div class="row">

                    <div class=" col bg d-none d-lg-block container-fluid">
                    
                    </div>
                    <div class="col rounded">
                        <div class="text-lg-end">
                            <img src="icono.png" width="58" alt="" class="m-1">
                            <h2 class="fw-bold text-center py-3 text-black">Seleccione su horario</h2>
                        </div>

                        <!--Para el registro-->

                        <form method="post" @submit.prevent="guardarAlumno" @reset="nuevoAlumno">
                            <div class="row g-3">
                                
                                <div class="col-md-6">
                                    <label for="codAlumnoMateria" class="from-label text-black">verificar Alumno</label>
                                    <input type="text" class="form-control" id="codAlumnoMateria" v-model="alumno.veri"
                                    pattern="[A-Za-zñÑáéíóúü]{4}[0-9]{6}"  placeholder="Codigo Alumno" required text = "text">
                                </div>
                                
                                <div class="col-md-6">
                                    <br>
                                    <input class="btn btn-primary" type="button" onclick="verificarAlumno()" value="Enviar">
                                </div>
                                <div id="error">hhh</div>

                                <!--Para controlar lo que se mostrara-->
                                <div id="escon" class="row" style="visibility:visible;">
              

                                    <div class="input-group mb-4">

                                    <div class="col-md-12">
                                        <p></p>
                                        <h4><label for="materia1" class="form-label text-black">Programacion IV </label></h4>
                                        <select id="materia1" class="form-select" v-model="alumno.mat1" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Matutino: LU 7:00 a 8:40</option>
                                        <option value="2">Vispertino: LU 1:00 a 2:30</option>
                                        <option value="3">No Cursa</option>
                
                                    </select>
                                    </div>
                                    <div class="col-md-12">
                                        <p></p>
                                        <h4><label for="materia2" class="form-label text-black">Base de Datos</label></h4>
                                        <select id="materia2" class="form-select" v-model="alumno.mat2" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Matutino: MA 10:30 a 12:20</option>
                                        <option value="2">Vispertino: MI 1:00 a 2:30</option>
                                        <option value="3">No Cursa</option>
                                    </select>
                                    </div>
                                    <div class="col-md-12">
                                        <p></p>
                                        <h4><label for="materia3" class="form-label text-black">Electronica</label></h4>
                                        <select id="materia3" class="form-select" v-model="alumno.mat3" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Matutino: JU 8:40 a 10:30</option>
                                        <option value="2">Matutino: JU 7:00 a 8:40</option>
                                        <option value="3">No Cursa</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12">
                                        <p></p>
                                        <h4><label for="materia4" class="form-label text-black">Ingles Tecnico</label></h4>
                                        <select id="materia4" class="form-select" v-model="alumno.mat4" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Matutino: MI 7:00 a 8:30</option>
                                        <option value="2">Matutino: MI 8:40 a 10:30</option>
                                        <option value="3">No Cursa</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12">
                                        <p></p>
                                        <h4><label for="materia5" class="form-label text-black">Ing.de Software </label></h4>
                                        <select id="materia5" class="form-select" v-model="alumno.mat5" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Matutino: JU 10:40 a 12:20</option>
                                        <option value="2">Matutino: JU 1:00 a 2:30</option>
                                        <option value="3">No Cursa</option>
                                        </select>
                                    </div>
                                <p></p>
                                <!--Para los botones-->
                                <div class="row">
                                    <div class="col col-md-5 text-center">
                                        <div v-if="alumno.mostrar_msg"
                                            class="alert alert-primary alert-dismissible fade show" role="alert">
                                            {{ alumno.msg }}
                                            <button type="button" class="btn-close" data-bs-dismiss="alert"
                                                aria-label="Close"> <span aria-hidden="true">&times;</span>
                                        </div>
                                    </div>
                                </div>
                                <p></p>
                                <div class="row g-2">
                                    <div class="col col-md-6 text-center">
                                        <input class="btn btn-success w-100" type="submit" value="Guardar">
                                    </div>
                                    <div class="col col-md-6 text-center">
                                        <input class="btn btn-primary w-100 " type="reset" value="Limpiar">
                                    </div>
                                </div>
                                <p></p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--Para la busqueda del alumno-->
            <div class="card text-white bg-white w-100" id="carBuscarAlumno">
                <div class="card-header bg-danger ">
                    Busqueda de Alumnos

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAlumno"
                        aria-label="Close"></button>
                </div>
                <div class="card-body ">
                    <table class="table table-dark table-hover w-100">
                        <thead>
                            <tr>
                                <th colspan="10">
                                    Buscar: <input @keyup="buscandoAlumno" v-model="buscar" placeholder="Buscar Alumno"
                                        class="form-control w-100" type="text">
                                </th>
                            </tr>
                            <tr>                                                            
                                <th>CODIGO</th>
                                <th>CARRERA</th>
                                <th>Programacion IV</th>
                                <th>Base de Datos</th>
                                <th>Electronica</th>
                                <th>Ingles Tecnico</th>
                                <th>Ing.de Software</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">                               
                                <td>{{alumno.codigo}}</td>                          
                                <td>{{alumno.carrera}}</td>
                                <td>{{alumno.mat1}}</td>
                                <td>{{alumno.mat2}}</td>
                                <td>{{alumno.mat3}}</td>
                                <td>{{alumno.mat4}}</td>
                                <td>{{alumno.mat5}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarAlumno(alumno)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    `

});