import React, { useEffect,useState } from "react";
import './styles.css';
import "../../global.css";
// import { FiUser, FiDollarSign } from 'react-icons/fi';
import { FcConferenceCall, FcInTransit,FcReadingEbook } from "react-icons/fc";
// import { GiBanknote } from "react-icons/gi";
import { RiNewspaperFill } from "react-icons/ri"
import { MdPlace } from "react-icons/md"
//import { useEffect } from 'react';

export default function Menu(){
    const[nome, setNome]=useState("")
    function buscarNome(){
    const value =localStorage.getItem("utilizador");
    const usu = JSON.parse(value);
    setNome(usu[0].nomeusuario)
    console.log(usu)
    }
    useEffect(()=>{
        buscarNome()
    },[])
    return(
        

        <div className="menu">
            
            <p>
                Menu
            </p>
            <a href="/listausuarios"><FcReadingEbook size={25}/>Usuários</a>
            <a href="/listaempresa"><FcInTransit size={25}/>Empresas</a>
            <a href="/listapatrimonio"><RiNewspaperFill color="blue" size={25}/>Patrimônio</a>
            <a href="/listalotacao"><FcConferenceCall size={25}/>Lotação</a>
            <a href="/listasetor"><MdPlace color="red" size={25}/>Setor</a>
            <p className="nome">
                Olá {nome}
            </p>
        </div>
    )
}