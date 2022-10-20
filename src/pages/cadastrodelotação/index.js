import React, { useEffect, useState } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
//import './styles.css';
import '../../global.css';
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useParams } from "react-router-dom";
import  api from "../../server/api";

export default function CadastrodeUsuario() {
    const [idusuario, setIdusuario] = useState('')
    const [idpatrimonio, setIdpatrimonio] = useState('')
    const [idempresa, setIdempresa] = useState('')
    const [idsetor, setIdsetor] = useState('')
    const [empresa, setEmpresa] = useState([])
    const [datamovimentacao, setDatamovimentacao] = useState('')
    const [patrimonio, setPatrimonio] = useState([])
    const [setor, setSetor] = useState([])
    const [usuario, setUsuario] = useState([])
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    const dados = {
        idusuario,
        idpatrimonio,
        idempresa,
        idsetor,
        datamovimentacao   
    }
    // function validasenha() {
    //     if (senha !== "") {
    //         if (senha !== Confsenha) {
    //             setValida(false)
    //             setMsg("Senhas não conferem!")
    //         } else {
    //             setValida(true)
    //             setMsg("Senhas iguais!")
    //         }
    //     } else {
    //         setValida(false)
    //         setMsg("Campo senha está vazio")
    //     }
    // }
    useEffect(() => {
        mostrarselects();
    }, [])
    function mostrarselects() {
        // let ListaUsuarios = JSON.parse(localStorage.getItem("cd-usuarios") || "[]")
        // setUsuario(ListaUsuarios);
        // let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas") || "[]")
        // setEmpresa(listaEmpresa)
        // let listaSetor = JSON.parse(localStorage.getItem("cd-setor") || "[]")
        // setSetor(listaSetor)
        // let listapatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio") || "[]")
        // setPatrimonio(listapatrimonio)
        api.get('/usuario')
        .then(res => {
            if(res.status==200){
                setUsuario(res.data.usuario);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/empresas')
        .then(res => {
            if(res.status==200){
                setEmpresa(res.data.empresas);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/patrimonio')
        .then(res => {
            if(res.status==200){
                setPatrimonio(res.data.patrimonio);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/setor')
        .then(res => {
            if(res.status==200){
                setSetor(res.data.setor);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }});
    }
    function salvardados(e) {
        e.preventDefault();
        //validasenha()
        let index = 0
        // if (nome.length <= 1) {
        //     setMsg("Campo nome precisa ter mais de 1 letra")
        //     index++
        // }
        // } else if (email === "") {
        //     setMsg("Campo email está vazio")
        //     index++
        // }
        
            // let listaUser = JSON.parse(localStorage.getItem("cd-lotacao") || "[]")

            // listaUser.push(
            //     {
            //         id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
            //         idempresa: idempresa,
            //         idpatrimonio: idpatrimonio,
            //         idsetor: idsetor,
            //         idusuario: idusuario,
            //         datamovimentacao: datamovimentacao
            //     }
            // )
            // localStorage.setItem("cd-lotacao", JSON.stringify(listaUser));
            // alert("Cadastro salvo com sucesso!!!!");
            // window.location.href = "/listalotacao";
        if (index === 0) {
        console.log(dados)
            api.post("lotacao",
                    dados,
                    {headers:{'Content-Type':'application/json'}}    
                ).then(function (response){
                    alert("Cadastro salvo com sucesso!!!");
                    window.location.href="/listalotacao"
                });
        }

    }
    return (
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu />
            <div className="principal">
                <Head title="Cadastro de lotação" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <label className="label">Usuarios {idusuario}</label>
                        <select value={idusuario} onChange={e => setIdusuario(e.target.value)}>
                        {/* <select onChange={e => setIdusuario(e.target.options[e.target.selectedIndex].text)}> */}
                            <option></option>
                            {usuario.map((usu) => {

                                return (

                                    <option value={usu.codusu}>{usu.nome}</option>
                                    // <option label={usu.nome}>{usu.id}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Patrimônio {idpatrimonio}</label>
                        <select value={idpatrimonio} onChange={e => setIdpatrimonio(e.target.value)}>
                        <option></option>
                            {patrimonio.map((pat) => {
                                return (
                                    <option value={pat.codpat}>{pat.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Setor {idsetor}</label>
                        <select value={idsetor} onChange={e => setIdsetor(e.target.value)}>
                        <option></option>
                            {setor.map((set) => {
                                return (
                                    <option value={set.codset}>{set.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Empresa {idempresa}</label>
                        <select value={idempresa} onChange={e => setIdempresa(e.target.value)}>
                        <option></option>
                            {empresa.map((emp) => {
                                return (
                                    <option value={emp.codemp}>{emp.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Data</label>
                        <input type={"date"} onChange={e=>setDatamovimentacao(e.target.value)}></input>
                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Cadastrar-se
                        </button>
                        {/* <a href="#">Cadastra nova Empresa</a> */}
                    </form>

                </section>
            </div>
        </div>
    )
}