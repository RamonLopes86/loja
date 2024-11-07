import estiloAPI from './consumir.module.css';
import axios from 'axios';
import React , {useEffect, useState} from 'react';
import Image from 'next/image';
import no from '/public/no.jpg'



export default function Consumir(){

    const [input , setInput] = useState('')
    const [arrayMove , setArrayMove]=useState([])
    const [msg , setMsg] = useState('')

    async function exibir(){

       
            try {

                const response = await axios.get(`http://www.omdbapi.com/?s=${input}&apikey=535ce9c5`)

                console.log(response.data.Search)

                if(!response.data.Search || response.data.Search.length === '' || response.data.Search.length === 0){
    
                   setMsg('titulo nao encontrado')
                   setArrayMove([])
            

                }else{
    
                    setArrayMove(response.data.Search)
                    setMsg('') 
                }

               

                
                
            } catch (error) {

                setMsg(error.mesage)
                
            }

          
        }


        useEffect(()=>{

            if(input.length === 0){

                setMsg('')
            }
            

        },[input])
                
    
           
      



    return(


        <section className={estiloAPI.boxPai}>

                <section className={estiloAPI.boxInput}>
                    
                    <input autoComplete='off' placeholder='busque o titulo do filme' onChange={(ev)=> setInput(ev.target.value)} value={input} type="text" name="pesquisa" id="idPesquisa" />

                    <button onClick={exibir}>pesquisar</button>
                </section>

                <section className={estiloAPI.boxMove}>

                        {

                            arrayMove.map((arrayMove , index)=>{

                                const imgValida = arrayMove.Poster !== 'N/A' ? arrayMove.Poster : no

                                return(

                                    <div key={index} className={estiloAPI.moldura}>

                                    <Image className={estiloAPI.img} alt={arrayMove.Title} width={300} height={300} src={imgValida}/>
                                    <p>{arrayMove.Title}</p>
                                    <p>{arrayMove.Year}</p>
                                    <p>{arrayMove.Type}</p>

                                </div>

                                )
                            


                            })

                                
                            
                              
                            
                            
                            


                        }

                        <p>{msg}</p>


                </section>



        </section>
    )
}