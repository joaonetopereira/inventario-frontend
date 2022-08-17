import React, { useState } from "react";
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
    const [nome, setNome] = useState('')
    //const [patrimonio, setPatrimonio] = useState('')
    //const [senha, setSenha] = useState('')
    //const [Confsenha, setConfSenha] = useState('')
    const [msg, setMsg] = useState('')
    //const [valida, setValida] = useState(true)
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
    function salvardados(e) {
        e.preventDefault();
        //validasenha()
            let index = 0
            if (nome.length <= 1) {
                setMsg("Campo nome precisa ter mais de 1 letra")
                index++
            }
            // } else if (email === "") {
            //     setMsg("Campo email está vazio")
            //     index++
            // }
            else if (index === 0) { 
                let listaUser = JSON.parse(localStorage.getItem("cd-setor")||"[]") 

                listaUser.push(
                    {
                        id: Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                        nome: nome,                       
                    }
                )
                localStorage.setItem("cd-setor",JSON.stringify(listaUser));
                alert("Cadastro salvo com sucesso!!!!");
                Window.location.href="/listasetor";
            }
        
    }
    return (
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu />
            <div className="principal">
                <Head title="Cadastro de setor" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <label className="label">Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
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