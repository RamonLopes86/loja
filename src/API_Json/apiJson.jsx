import estiloJson from './json.module.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faStar, faUser, faCartShopping, faBars, faMagnifyingGlass, faBolt, faScrewdriverWrench, faSquarePersonConfined, faBoltLightning, faDroplet, faShower, faShieldHalved, faBrush, faToolbox, faSignHanging, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import seta from '../public/seta.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'Swiper/css'
import 'Swiper/css/navigation'
import 'Swiper/css/pagination'
import Image from 'next/image';




export default function Ajson() {

    const icons = {

        faBolt: faBolt,
        faScrewdriverWrench: faScrewdriverWrench,
        faSquarePersonConfined: faSquarePersonConfined,
        faBoltLightning: faBoltLightning,
        faDroplet: faDroplet,
        faShower: faShower,
        faShieldHalved: faShieldHalved,
        faBrush: faBrush,
        faToolbox: faToolbox,
        faSignHanging: faSignHanging
    }

    const [dados, setDados] = useState([])
    const [produtos, setProdutos] = useState([])
    const [input, setInput] = useState('')
    const [depart, setDep] = useState([])
    const [subDepartMatEle, setSubDepartMatEle] = useState([])
    const [condButton, setCondButton] = useState(estiloJson.botaoLiga)
    const [blog, setBlog] = useState([])
    const [cupom , setCupom] = useState([])

    const refProdutos = useRef()
    const refBoxProdutos = useRef()



    async function consumirJson() {

        const response = await axios.get('http://localhost:8080/exibir')



        try {

            setDados(response.data.brands)

            setBlog(response.data.blog)

            setCupom(response.data.cupons)



        } catch (error) {

            alert(error.mesage)
        }

    }


    async function consumirProdutos() {

        const responseProdutos = await axios.get('http://localhost:8080/exibir')

        setProdutos(responseProdutos.data.products)

        setDep(responseProdutos.data.departaments)

        setSubDepartMatEle(responseProdutos.data.departaments)

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

                setCondButton(estiloJson.botaoDesliga)




                window.history.pushState({}, '', `?nome=${input}`)

            } else {


                window.history.pushState({}, '', `?nome=${input}`)
                alert('produto nao encontrado')
            }

        } catch (error) {

            console.log(error.status)

        }

    }





    function actionButton(param) {




        if (window.innerWidth <= 1300) {

            if (param === 'next') {

                if (refProdutos.current.scrollLeft + refProdutos.current.offsetWidth <= refBoxProdutos.current.scrollWidth) {

                    return refBoxProdutos.current.scrollLeft += refProdutos.current.offsetWidth * 1.3
                }


            }

            else if (param === 'back') {

                if (refBoxProdutos.current) {

                    return refBoxProdutos.current.scrollLeft -= refProdutos.current.offsetWidth * 1.3
                }

            }

        } else {


            if (param === 'next') {

                if (refProdutos.current.scrollLeft + refProdutos.current.offsetWidth <= refBoxProdutos.current.scrollWidth) {

                    return (refBoxProdutos.current.scrollLeft += refProdutos.current.offsetWidth * 3)
                }


            }

            else if (param === 'back') {

                if (refBoxProdutos.current) {

                    return (refBoxProdutos.current.scrollLeft -= refProdutos.current.offsetWidth * 3)
                }

            }


        }



    }





    useEffect(() => {

        consumirJson()



    }, [])



    useEffect(() => {


        try {

            if (input.length === 0) {

                consumirProdutos()

                setCondButton(estiloJson.botaoLiga)

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
                            <input onChange={(ev) => setInput(ev.target.value)} value={input} autoComplete='off' placeholder='Pesquise pelo pruduto' type="text" name="pesquisa" id="idpesquisa" />
                            <button type='submit'><FontAwesomeIcon className={estiloJson.iconPesq} icon={faMagnifyingGlass} /> </button>
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

                                <li className={estiloJson.titDep}>

                                    <div><FontAwesomeIcon icon={faBars} /> Departamentos</div>


                                    <ul className={estiloJson.subDep}>
                                        {/* <li>Ferragens <Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Materiais Elétricos <Image alt='images' width={15} height={15} src={seta} />  </li>
                                        <li>Ferramentas <Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Iluminação <Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Pintura <Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Sinalização<Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Materiais hidraulicos<Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Segurança <Image alt='images' width={15} height={15} src={seta} /> </li>
                                        <li>Durchas e Chuveiros<Image width={15} height={15} src={seta} /> </li>
                                        <li>Equipamentos<Image alt='images' width={15} height={15} src={seta} /> </li> */}

                                        {
                                            depart.map((depart, index) => {

                                                return (

                                                    <li key={index}>{depart.name} <Image alt='imagem seta' width={15} height={15} src={seta} /> </li>
                                                )
                                            })
                                        }

                                    </ul>


                                    {

                                        subDepartMatEle.map((subDep, index) => {

                                            return (

                                                <section className={`${estiloJson.boxUniversal} ${estiloJson.box}`} key={index}>

                                                    <h3>{subDep.name}</h3>

                                                    {


                                                        <ul className={estiloJson.ulUniversal}>

                                                            {
                                                                subDep.categories.map((sub, index) => {

                                                                    return (

                                                                        <li key={index}>{sub.name}</li>
                                                                    )

                                                                })
                                                            }

                                                        </ul>




                                                    }



                                                </section>
                                            )
                                        })

                                    }

                                    {/* <section className={`${estiloJson.boxSubFerr} ${estiloJson.box} `}>

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

                                            
                                    </section> */}



                                    {/* <section className={`${estiloJson.boxSubmatEle} ${estiloJson.box}`}>

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


                                    </section> */}

                                    {/* <section className={`${estiloJson.boxSubFerramentas} ${estiloJson.box}`}>

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


                                    </section> */}

                                    {/* <section className={`${estiloJson.boxIlum} ${estiloJson.box}`}>

                                        <h3>Iluminação</h3>

                                        <ul>
                                            <li>Lâmpadas Frias</li>
                                            <li>Lampadas Coloridas</li>
                                            <li>Refletores</li>
                                            <li>Arandelas</li>
                                            <li>Alicates</li>
                                            <li>Lampadas Quentes</li>
                                            <li>Luminárias</li>
                                            <li>Lâmpadas inteligentes</li>
                                            <li>Fitas de Led</li>

                                        </ul>


                                    </section> */}


                                    {/* <section className={`${estiloJson.boxPint} ${estiloJson.box}`}>

                                        <h3>Pintura</h3>

                                        <ul>
                                            <li>Tinta látex</li>
                                            <li>Massas para alisamento</li>
                                            <li>Proteção e segurança</li>
                                            <li>Solventes e diluentes</li>
                                            <li>Sprays</li>
                                            <li>Removedores de tinta</li>
                                            <li>Texturas e efeitos decorativos</li>
                                            <li>Primers e seladores</li>


                                        </ul>


                                    </section> */}


                                </li>

                                <li>Promoções do Dia</li>
                                <li>Cupons</li>
                                <li>Serviços</li>
                                <li>Dicas</li>
                                <li>Suporte</li>

                            </ul>






                        </nav>



                    </section>

                </div>

            </section>


            <section className={estiloJson.boxDepartamentos}>

                <h1 className={estiloJson.hTit}>Navegue por Departamentos :</h1>



                <Swiper

                    className={estiloJson.boxPaiSwiper}
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={8}
                    spaceBetween={0}
                    simulateTouch={true}
                    grabCursor={true}

                    breakpoints={

                        {
                            100: { slidesPerView: 1 },
                            500: { slidesPerView: 3 },
                            600: { slidesPerView: 4 },

                            900: { slidesPerView: 6 },

                            1024: { slidesPerView: 8 }
                        }

                    }


                >



                    {
                        depart.map((depart, index) => {
                            return (

                                <SwiperSlide key={index} className={estiloJson.boxSwiper}>
                                    <div className={estiloJson.boxCardDep}>
                                        <div className={estiloJson.boxDepIcon}>
                                            <FontAwesomeIcon className={estiloJson.iconDep} icon={icons[depart.icon]} />
                                        </div>
                                        <h3>{depart.name}</h3>
                                    </div>
                                </SwiperSlide>

                            )
                        })
                    }



                </Swiper>











            </section>


            <section className={`${estiloJson.boxBotoes} `}>

                <div className={`${estiloJson.boxBtnPrevNext} ${condButton}  `} >

                    <FontAwesomeIcon onClick={() => actionButton('next')} className={estiloJson.iconPrevNext} icon={faChevronRight} />
                    <FontAwesomeIcon onClick={() => actionButton('back')} style={{ transform: 'rotate(180deg)' }} className={estiloJson.iconPrevNext} icon={faChevronRight} />
                </div>

                <section ref={refBoxProdutos} className={estiloJson.boxPromocoes}>

                    {
                        produtos.map((produtos, index) => {

                            return (

                                <div ref={refProdutos} key={index} className={estiloJson.produtos}>
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





            <section className={estiloJson.boxPaiMarcas}>

                <h1>Navegue pelas Marcas:</h1>




                <section className={estiloJson.boxMarcas}>




                    <Swiper


                       
                        spaceBetween={20}
                        modules={[Autoplay]}
                        autoplay={{ delay: 0 }}
                        speed={1500}
                        loop={true}
                        breakpoints={
                            
                            {
                                1024:{slidesPerView:6},
                                960:{slidesPerView:4},
                                600:{slidesPerView:3},
                                500:{slidesPerView:2}
                                

                            }

                    
                    }


                    >






                        {
                            dados.map((dados, index) => {
                                return (


                                    <SwiperSlide key={index} >


                                        <div className={estiloJson.moldura}>
                                            <Image alt={dados.name} className={estiloJson.iconMarcas} width={100} height={100} src={dados.logo} />
                                        </div>

                                    </SwiperSlide>




                                )
                            })
                        }

                    </Swiper>




                </section>




            </section>

            <section className={estiloJson.boxPaiCupons}>

                <div className={estiloJson.boxCupons}>

                        {
                            cupom.map((cupom , index)=>{

                                return(

                                    <div key={index} className={estiloJson.moldCupom} style={{backgroundImage:`url(${cupom.image})`}}>
                                        
                                        <div className={estiloJson.boxDesconto}>
                                            <p>{cupom.des} OFF </p>
                                        </div>
                                       
                                        <div className={estiloJson.moldTx}>
                                            <h2>{cupom.title}</h2>
                                            <p>*use o cupom {cupom.cup}</p>

                                        </div>

                                    </div>
                        

                                )

                            })
                        }


                </div>



            </section>


            <section className={estiloJson.boxPorDentro}>

                <h1>Fique por dentro</h1>

                <div className={estiloJson.boxPaiPorDentro}>

                    {

                        blog.map((blog, index) => {

                            return (

                                <div key={index} className={estiloJson.molduraPorDentro}>

                                    <Image className={estiloJson.iconDentro} alt={blog.title} width={400} height={200} src={blog.image} />
                                    <p>{blog.title}</p>
                                    <button>Saiba Mais</button>

                                </div>

                            )
                        })

                    }

                </div>

            </section>

        </section>



    )
}