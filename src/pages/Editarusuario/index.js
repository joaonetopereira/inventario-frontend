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


export default function EditarUsuario() {
    const {id}= useParams()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [Confsenha, setConfSenha] = useState('')
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    
    useEffect(()=>{
        mostrardados();
    },[])
    function mostrardados(){
        let listaUser = JSON.parse(localStorage.getItem("cd-usuarios"))
         listaUser.
            filter(value => value.id == id).
            map(value => {
                setNome(value.nome)
                setEmail(value.email)
                setSenha(value.senha)
                setConfSenha(value.senha)
            })
    }
    function validasenha() {
        if (senha !== "") {
            if (senha !== Confsenha) {
                setValida(false)
                setMsg("Senhas não conferem!")
            } else {
                setValida(true)
                setMsg("Senhas iguais!")
            }
        } else {
            setValida(false)
            setMsg("Campo senha está vazio")
        }
    }
    function salvardados() {
        //e.preventDefault();
        validasenha()
        if (valida === false) {
            setMsg("Senhas não conferem")
        } else {
            let index = 0
            if (nome.length <= 3) {
                setMsg("Campo nome precisa ter mais de 3 letras")
                index++
            } else if (email === "") {
                setMsg("Campo email está vazio")
                index++
            }
            if (index === 0) {
                let listaUser = JSON.parse(localStorage.getItem("cd-usuarios"))
                listaUser.map((item)=>{
                    if(item.id==id){
                        item.nome=nome;
                        item.email=email;
                        item.senha=senha;
                    }
                })
                localStorage.setItem("cd-usuarios",JSON.stringify(listaUser))
                window.location.href="/listausuarios";
                alert("Dados salvos com sucesso");
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
                <Head title="Editar usuario" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <p>{id}</p>
                        <label className="label">Nome</label>

                        <input placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label className="label">Email</label>
                        <input placeholder="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label className="label">Senha</label>
                        <input placeholder="senha" type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <label className="label">Confirmar senha</label>
                        <input placeholder="Confirmar senha" type="password"
                            onKeyUp={validasenha}
                            value={Confsenha}
                            onChange={e => setConfSenha(e.target.value)}
                        />
                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Salvar
                        </button>
                        {/* <a href="#">Cadastra nova Empresa</a> */}
                    </form>

                </section>
            </div>
        </div>
    )
}