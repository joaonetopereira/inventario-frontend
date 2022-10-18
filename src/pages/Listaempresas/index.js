import React, { useState, useEffect } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
import './styles.css';
import '../../global.css';
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import  'react-confirm-alert/src/react-confirm-alert.css' ;
import api from "../../server/api";


export default function Listaempresa(){
    const [dados,setDados] = useState([]);
    useEffect(()=>{
        mostrarlista();
    },[])
    function Editar(i){
        window.location.href=`/editarempresa/${i}`
    }
    function mostrarlista(){
        // let cadastros = JSON.parse(localStorage.getItem("cd-empresas") || "[]")
        // setDados(cadastros)
        api.get('/empresas')
        .then(res => {
            if(res.status==200){
                setDados(res.data.empresas);
                console.log("status "+res.status);
                console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }
           
        });
        
    }
    function excluir(i,nome){
        confirmAlert ( { 
            title : 'Excluir empresa' , 
            message : `Deseja realmente excluir a empresa ${nome}` , 
            buttons : [ 
              { 
                label : 'Sim' , 
                onClick : ( )  => {
                    // let dadosnovos = []
                    // dadosnovos=dados.filter(item => item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem('cd-empresas',JSON.stringify(dadosnovos))
                    api.delete(`/empresas/${i}`)
                    .then(res=>{});
                    alert("dados deletados com sucesso");
                    mostrarlista();
                }
              } , 
              { 
                label : 'não' , 
                // onClick :( )  =>  alert ( 'Click No' ) 
              } 
            ] 
          } ) ; 
    }
    return(
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu/>
            <div className="principal">
                <Head title="Lista de empresas"/>
                <div className="button_new">
                    <a href="/cadastrodeempresa">
                        <FiFilePlus
                        size={24}
                        color="green"
                        cursor="pointer"
                        />
                    </a>
                </div>
                {/* <p>Lista de usúarios</p> */}
                { dados.length>0 ?
                <table border={1} border-color="black">
                <tr>
                    <th>Id</th>
                    <th>Empresa</th>
                    <th>Responsavel</th>
                    <th>contato</th>
            
                    <th></th>
                </tr>
                    {
                    dados.map(usu=>{
                    return(
                        <tr key={usu.codemp}>
                            <td>{usu.codemp}</td>
                            <td>{usu.nome}</td>
                            <td>{usu.responsavel}</td>
                            <td>{usu.contato}</td>
                            <td><FiEdit color="blue" size={18} cursor="pointer" onClick={(e)=>Editar(usu.codemp)}/></td>
                            <td><FiDelete color="red" size={18} onClick={(e)=>excluir(usu.codemp,usu.nome)}
                            cursor="pointer" 
                            /></td>
                        </tr>
                        )
                    })
                    }
                </table>
                :
                <table border={1} border-color="black">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>responsavel</th>
                    <th>contato </th>
                    <th></th>
                    <th></th>
                </tr>
                </table>
                }
                
            </div>
        </div>
    )
}