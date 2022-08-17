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


export default function CadastrodeUsuario() {
    const [idusuario, setIdusuario] = useState('')
    const [idpatrimonio, setIdpatrimonio] = useState('')
    const [idempresa, setIdempresa] = useState('')
    const [idsetor, setIdsetor] = useState('')
    const [empresa, setEmpresa] = useState([])
    const [datamovimentacao, setDatamovimentacao] = useState('')
    const [Patrimonio, setPatrimonio] = useState([])
    const [setor, setSetor] = useState([])
    const [usuario, setUsuario] = useState([])
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    let dados = [
        {

        }
    ]
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
        let ListaUsuarios = JSON.parse(localStorage.getItem("cd-usuarios") || "[]")
        setUsuario(ListaUsuarios);
        let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas") || "[]")
        setEmpresa(listaEmpresa)
        let listaSetor = JSON.parse(localStorage.getItem("cd-setor") || "[]")
        setSetor(listaSetor)
        let listapatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio") || "[]")
        setPatrimonio(listapatrimonio)
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
        if (index === 0) {
            let listaUser = JSON.parse(localStorage.getItem("cd-lotacao") || "[]")

            listaUser.push(
                {
                    id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                    idempresa: idempresa,
                    idpatrimonio: idpatrimonio,
                    idsetor: idsetor,
                    idusuario: idusuario,
                    datamovimentacao: datamovimentacao
                }
            )
            localStorage.setItem("cd-lotacao", JSON.stringify(listaUser));
            alert("Cadastro salvo com sucesso!!!!");
            window.location.href = "/listalotacao";
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
                            <option></option>
                            {usuario.map((usu) => {

                                return (

                                    <option value={usu.id}>{usu.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Patrimônio {idpatrimonio}</label>
                        <select value={idpatrimonio} onChange={e => setIdpatrimonio(e.target.value)}>
                        <option></option>
                            {Patrimonio.map((pat) => {
                                return (
                                    <option value={pat.id}>{pat.nome}</option>
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
                                    <option value={set.id}>{set.nome}</option>
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
                                    <option value={emp.id}>{emp.nome}</option>
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