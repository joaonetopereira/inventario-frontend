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


export default function Cadastrodeempresa() {
    const [nome, setNome] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [contato, setContato] = useState('')
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    
    let dados = [
        {
            
        }
    ]
    function salvardados(e) {
        e.preventDefault();
        if (valida === false) {
            setMsg("Senhas não conferem")
        } else {
            let index = 0
            if (nome.length <= 1) {
                setMsg("Campo nome precisa ter mais de 1 letras")
                index++
            } else if (responsavel === "") {
                setMsg("Campo email está vazio")
                index++
            }
            if (index === 0) { 
                let listaUser = JSON.parse(localStorage.getItem("cd-empresas")||"[]") 

                listaUser.push(
                    {
                        id: Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                        nome: nome,
                        responsavel: responsavel,
                        contato: contato
                        //email: email,
                        // senha: senha
                    }
                )
                localStorage.setItem("cd-empresas",JSON.stringify(listaUser));
                alert("Cadastro salvo com sucesso!!!!");
                Window.location.href="/listaempresas";
            }
        }
    }
    return (
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu />
            <div className="principal">
                <Head title="Cadastro de empresas" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <label className="label">Nome</label>
                        <input placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label className="label">Responsavel</label>
                        <input placeholder="Responsavel"
                            type="text"
                            value={responsavel}
                            onChange={e => setResponsavel(e.target.value)}
                        />
                        <label className="label">Contato</label>
                        <input placeholder="contato" type="text"
                            value={contato}
                            onChange={e => setContato(e.target.value)}
                        />
                        {/* <label className="label">Confirmar senha</label>
                        <input placeholder="Confirmar senha" type="password"
                            onKeyUp={validasenha}
                            value={Confsenha}
                            onChange={e => setConfSenha(e.target.value)}
                        /> */}
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