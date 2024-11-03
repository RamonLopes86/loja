import estiloJson from './json.module.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faStar, faUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons'
import seta from '../public/seta.png'



import Image from 'next/image';








export default function Ajson() {

    const [dados, setDados] = useState([])
    const [produtos, setProdutos] = useState([])
    const [input, setInput] = useState('')

    const [cond, setCond] = useState(false)
    const timeoutRef = useRef(null);


    const [animaFerr, setAnimaFer] = useState(estiloJson.animaFerrOff)



    async function consumirJson() {

        const response = await axios.get('http://localhost:8080/exibir')



        try {

            setDados(response.data.brands)

        } catch (error) {

            alert(error.mesage)
        }

    }


    async function consumirProdutos() {

        const responseProdutos = await axios.get('http://localhost:8080/exibir')

        setProdutos(responseProdutos.data.products)


        console.log(responseProdutos.data)


    }


    async function pesquisar(ev) {

        ev.preventDefault()

        try {

            const responsePesquisa = await axios.get(`http://localhost:8080/consulta?nome=${input}`)



            if (input.length === 0) {

                alert('digite algo')


            }

            if (responsePesquisa.data.length > 0) {

                setProdutos(responsePesquisa.data)



                window.history.pushState({}, '', `?nome=${input}`)

            } else {


                window.history.pushState({}, '', `?nome=${input}`)
                alert('produto nao encontrado')
            }

        } catch (error) {

            console.log(error.status)

        }




    }


    useEffect(() => {

        consumirJson()



    }, [])





    useEffect(() => {


        try {

            if (input.length === 0) {

                consumirProdutos()

                window.history.pushState({}, '', window.location.pathname);
            } else {


            }

        } catch (error) {

            alert(error.status)
        }


    }, [input])









    return (

        <section className={estiloJson.boxJson}>


            <section className={estiloJson.boxPaiTop}>
                <div className={estiloJson.Top}>
                    <section className={estiloJson.boxConteudo}>

                        <div className={estiloJson.boxLogo}>
                            <h1>Moura</h1>
                            <FontAwesomeIcon className={estiloJson.house} icon={faHouse} />
                        </div>
                        <form onSubmit={pesquisar}>
                            <input onChange={(ev) => setInput(ev.target.value)} value={input} autoComplete='off' placeholder='pesquise o item desejado' type="text" name="pesquisa" id="idpesquisa" />
                            <button type='submit'>pesquisar</button>
                        </form>
                        <div className={estiloJson.boxLocaliza}>
                            <FontAwesomeIcon className={estiloJson.iconLocaliza} icon={faLocationDot} />
                            <FontAwesomeIcon className={estiloJson.iconLocaliza} icon={faCartShopping} />
                            <FontAwesomeIcon className={estiloJson.iconLocaliza} icon={faUser} />
                        </div>
                    </section>
                    <section className={estiloJson.boxNav}>

                        <nav className={estiloJson.navMenu}>


                            <ul className={estiloJson.ulMenu}>

                                <li className={estiloJson.titDep}>Departamentos


                                    <ul className={estiloJson.subDep}>
                                        <li>Ferragens</li>
                                        <li>Materiais Elétricos</li>
                                        <li>Ferramentas</li>
                                        <li>Iluminação</li>
                                        <li>Pintura</li>
                                        <li>Sinalização</li>
                                        <li>Materiais hidraulicos</li>
                                        <li>Segurança</li>
                                        <li>Durchas e Chuveiros</li>
                                        <li>Equipamentos</li>
                                    </ul>

                                    <section className={`${estiloJson.boxSubFerr} ${estiloJson.box} `}>

                                        <h3>Ferragens</h3>

                                        <ul>
                                            <li>Parafusos</li>
                                            <li>Dobradiças e Abraçadeiras</li>
                                            <li>Puxadores</li>
                                            <li>Grampos</li>
                                            <li>Porcas</li>
                                            <li>Ganchos/Suportes</li>
                                            <li>Correntes e cabos de aço</li>
                                        </ul>

                                    </section>


                                    <section className={`${estiloJson.boxSubmatEle} ${estiloJson.box}`}>

                                        <h3>Materiais Elétricos</h3>

                                        <ul>
                                            <li>Fios E Cabos</li>
                                            <li>Caixa de Distribuição</li>
                                            <li>Lampadas e Luminárias</li>
                                            <li>Extensões e filtros de linha</li>
                                            <li>Multímetros e Detectores de tensão</li>
                                            <li>Disjuntoes e fusiveis</li>
                                            <li>Conduítes e eletroudutos</li>
                                            <li>Transformadores</li>
                                            <li>Produtos para aterramento</li>
                                            <li>baterias, Pilhas e carregadores</li>
                                        </ul>


                                    </section>

                                    <section className={`${estiloJson.boxSubFerramentas} ${estiloJson.box}`}>

                                        <h3>Ferramentas</h3>

                                        <ul>
                                            <li>Fita métrica,níveis e pquímetro</li>
                                            <li>Emxadas e Tesoura de poda</li>
                                            <li>Chaves de fenda philips</li>
                                            <li>Alicate de corte</li>
                                            <li>Alicates</li>
                                            <li>Disjuntoes e fusiveis</li>
                                            <li>Pinceis , rolos e bandejas</li>
                                            <li>Ferramentas automotivas</li>
                                            <li>Martelos</li>
                                            <li>Alicate de Ponta</li>
                                        </ul>


                                    </section>


                                </li>

                            </ul>






                        </nav>



                    </section>

                </div>

            </section>

            <section className={estiloJson.boxPaiMarcas}>

                <section className={estiloJson.boxMarcas}>
                    {
                        dados.map((dados, index) => {
                            return (
                                <div key={index} className={estiloJson.moldura}>
                                    <Image alt={dados.name} className={estiloJson.iconMarcas} width={100} height={100} src={dados.logo} />
                                </div>
                            )
                        })
                    }
                </section>

            </section>


            <section className={estiloJson.boxPromocoes}>


                {
                    produtos.map((produtos, index) => {
                        return (
                            <div key={index} className={estiloJson.produtos}>


                                {

                                    produtos.images.length > 0 ? <Image className={estiloJson.iconProd} width={200} height={200} alt={produtos.name} src={produtos.images[0]} /> : <Image className={estiloJson.iconProd} width={200} height={20} src={produtos.images} />


                                }

                                <div className={estiloJson.boxTx}>

                                    {
                                        produtos.promotionalPrice === null ? <span>SEM ESTOQUE</span> : <span>{(((produtos.promotionalPrice - produtos.price) / produtos.promotionalPrice) * 100).toFixed(0)} % </span>
                                    }

                                    <p>{produtos.name}</p>
                                    <div className={estiloJson.boxStar}>
                                        <FontAwesomeIcon className={estiloJson.star} icon={faStar} />
                                        <FontAwesomeIcon className={estiloJson.star} icon={faStar} />
                                        <FontAwesomeIcon className={estiloJson.star} icon={faStar} />
                                        <FontAwesomeIcon className={estiloJson.star} icon={faStar} />
                                        <FontAwesomeIcon className={estiloJson.star} icon={faStar} />
                                    </div>
                                    <p> R$ {produtos.price}</p>
                                    <p> R$ {produtos.promotionalPrice}</p>
                                    <p>{produtos.quantilyInStock}</p>
                                    <p>12x de {(produtos.price / 12).toFixed(2)} sem juros</p>
                                </div>
                                <div className={estiloJson.boxComprar}>

                                    <button>comprar</button>
                                </div>
                            </div>
                        )
                    })
                }
            </section>


        </section>



    )
}