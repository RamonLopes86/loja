import estiloJson from './json.module.css';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLocationDot, faStar, faUser, faCartShopping, faBars, faMagnifyingGlass, faBolt, faScrewdriverWrench, faSquarePersonConfined, faBoltLightning, faDroplet, faShower, faShieldHalved, faBrush, faToolbox, faSignHanging, faChevronRight, faEnvelope, faPaperPlane, faAnglesUp , faX , faArrowRight } from '@fortawesome/free-solid-svg-icons'
import seta from '/public/seta.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'Swiper/css'
import 'Swiper/css/navigation'
import 'Swiper/css/pagination'
import Image from 'next/image';
import alicate from '/public/alicate.jpg'
import furadeira from '/public/furadeira.jpg'
import chuveiro from '/public/chuveiro.jpg'
import insta from '/public/insta.png'
import tik from '/public/tik.png'
import you from '/public/yt.png'
import lk from '/public/lkd.png'
import elo from '/public/elo.png'
import visa from '/public/visa.png'
import pix from '/public/pix.png'
import master from '/public/master.png'
import qr from '/public/qr.png'




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

    const redes = [insta, lk, you, tik, elo, visa, pix, master, qr]





    const [dados, setDados] = useState([])
    const [produtos, setProdutos] = useState([])
    const [input, setInput] = useState('')
    const [depart, setDep] = useState([])
    const [subDepartMatEle, setSubDepartMatEle] = useState([])
    const [depPesq, setDepPesq] = useState(estiloJson.boxPromocoesSemFlex)
    const [animabtn, setAnimaBtn] = useState(estiloJson.botaoLiga)
    const [blog, setBlog] = useState([])
    const [cupom, setCupom] = useState([])

    const [setaPesquisMais, setSetaPesquisaMais] = useState(estiloJson.pesqMaisDesliga)

    const [cond , setCond] = useState(false)
    const [condSub , setCondSub] = useState(false)

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

        setDepPesq(estiloJson.boxPromocoesSemFlex)


       

    }






    async function pesquisar(ev) {

        ev.preventDefault()

        try {

            const responsePesquisa = await axios.get(`http://localhost:8080/consulta?nome=${input}`)




            if (input.length === 0) {

                alert('digite algo')
                setAnimaBtn(estiloJson.botaoLiga)
                setDepPesq(boxPromocoesSemFlex)
            }




            if (responsePesquisa.data.length > 0) {

                setProdutos(responsePesquisa.data)
                window.history.pushState({}, '', `?nome=${input}`)

                setDepPesq(estiloJson.boxPromocoesFlex)
                setAnimaBtn(estiloJson.botaoDesliga)

                scrollToPoint()

                setSetaPesquisaMais(estiloJson.pesqMaisLiga)

            } else {

                setAnimaBtn(estiloJson.botaoLiga)
                setDepPesq(estiloJson.boxPromocoesSemFlex)
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



    function scrollToPoint() {

        const elemento = window.document.getElementById('idref')

        elemento.scrollIntoView({ behavior: 'smooth' })

    }

    function scrollToPointTopo() {

        const elementoTopo = window.document.getElementById('refTop')

        elementoTopo.scrollIntoView({ behavior: 'smooth' })
    }
    

    
    
   function openMenuEscondido(nome){


        if(nome === 'fecha'){

             setCond(false)

        }else if(nome === 'abre'){

           setCond(true) 
        }

   }


    useEffect(() => {

        consumirJson()


        let count = 1

       

        function NextImage(){

            count ++

            if(count >=4){
    
                count = 1

            }
                
    
                
            document.getElementById('radio' + count).checked = true
            
    
        }
      
    const intervalo =   setInterval(()=>{

            NextImage()

       },5000)
       

       return () => clearInterval(intervalo)

    }, [])



    useEffect(() => {


        try {

            if (input.length === 0) {

                consumirProdutos()
                setAnimaBtn(estiloJson.botaoLiga)
                setSetaPesquisaMais(estiloJson.pesqMaisDesliga)


                window.history.pushState({}, '', window.location.pathname);
            } else {


            }

        } catch (error) {

            alert(error.status)
        }


    }, [input])


    useEffect(()=>{

        const recolheMenuEscondido = () =>{

            if(window.innerWidth >=870){

                setCond(false)
                setCondSub(false)
            }

        }

        window.addEventListener('resize' , recolheMenuEscondido)


        return()=> window.removeEventListener('resize' ,recolheMenuEscondido)
    },[])


    
    return (

        <section className={estiloJson.boxJson}>

            <Link className={estiloJson.btnUp} href={'#refTop'}><FontAwesomeIcon className={estiloJson.btnUp} width={100} height={100} icon={faAnglesUp} /></Link>


            <section id='refTop' className={estiloJson.boxPaiTop}>

                <div className={estiloJson.Top}>

                    <section className={estiloJson.boxConteudo}>

                        <div className={estiloJson.boxLogo}>


                            <FontAwesomeIcon onClick={()=>openMenuEscondido('abre')} className={estiloJson.iconLogoHam} icon={faBars} />


                            <div className={estiloJson.boxLogoTx}>
                                <h1>Ramon</h1>
                                <FontAwesomeIcon  className={estiloJson.house} icon={faHouse} />
                            </div>
                        </div>

                        <form onSubmit={pesquisar}>
                            <input onChange={(ev) => setInput(ev.target.value)} value={input} autoComplete='off' placeholder='Pesquise pelo produto' type="text" name="pesquisa" id="idpesquisa" />
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

                                <Link href={'#idref'}><li>Promoções do Dia</li></Link>
                                <Link href={'#idcupom'} ><li>Cupons</li></Link>
                                <Link href={'#iddentro'}><li>Serviços</li></Link>
                                <li>Dicas</li>
                                <Link href={'#idcontato'}><li>Suporte</li></Link>

                            </ul>






                        </nav>

                    </section>


                    <section className={estiloJson.boxInputEscondido}>
                        <form onSubmit={pesquisar}>
                            <input onChange={(ev) => setInput(ev.target.value)} value={input} autoComplete='off' placeholder='Pesquise pelo produto' type="text" name="pesquisa" id="idpesquisa" />
                            <button type='submit'><FontAwesomeIcon className={estiloJson.iconPesq} icon={faMagnifyingGlass} /> </button>
                        </form>
                    </section>



                </div>

            </section>

            <section className={estiloJson.slider}>



                <div id='teste'  className={estiloJson.slides}>


                    <input type="radio" name="radio" id="radio1" />
                    <input type="radio" name="radio" id="radio2" />
                    <input type="radio" name="radio" id="radio3" />




                    <div id='sld1'  className={estiloJson.slide}>
                        <Image className={estiloJson.imgSlide} alt='imagens' src={furadeira} />
                    </div>

                    <div id='sld2' className={estiloJson.slide}>
                        <Image className={estiloJson.imgSlide} alt='imagens' src={chuveiro} />
                    </div>

                    <div id='sld3' className={estiloJson.slide}>
                        <Image className={estiloJson.imgSlide} alt='imagens' src={alicate} />
                    </div>




                    <div className={estiloJson.navigation}>

                        <label className={estiloJson.firstLabel} htmlFor="radio1"></label>
                        <label htmlFor="radio2"></label>
                        <label htmlFor="radio3"></label>

                    </div>




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

                <h1 id='idref'>Promoçoes do dia :

                    <button onClick={scrollToPointTopo} className={`${estiloJson.btnPesquiarMais} ${setaPesquisMais} `}><FontAwesomeIcon className={`${estiloJson.iconPesqMais} `} width={100} height={100} icon={faMagnifyingGlass} /></button>

                </h1>


                <div className={`${estiloJson.boxBtnPrevNext} ${animabtn} `} >

                    <FontAwesomeIcon onClick={() => actionButton('next')} className={estiloJson.iconPrevNext} icon={faChevronRight} />
                    <FontAwesomeIcon onClick={() => actionButton('back')} style={{ transform: 'rotate(180deg)' }} className={estiloJson.iconPrevNext} icon={faChevronRight} />
                </div>

                <section ref={refBoxProdutos} className={` ${depPesq}`} >

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


                        slidesPerView={8}
                        spaceBetween={20}
                        modules={[Autoplay]}
                        autoplay={{ delay: 0 }}
                        speed={1500}
                        loop={true}
                        breakpoints={

                            {
                                1024: { slidesPerView: 6 },
                                960: { slidesPerView: 4 },
                                600: { slidesPerView: 3 },
                                500: { slidesPerView: 2 }


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

            <section id='idcupom' className={estiloJson.boxPaiCupons}>

                <h1>Cupons :</h1>

                <div className={estiloJson.boxCupons}>

                    {
                        cupom.map((cupom, index) => {

                            return (

                                <div key={index} className={estiloJson.moldCupom} style={{ backgroundImage: `url(${cupom.image})` }}>

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


            <section id='iddentro' className={estiloJson.boxPorDentro}>

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


            <section className={estiloJson.boxSend}>

                <aside className={estiloJson.boxTxSend}>

                    <h3>Cadastre-se e, nossa NewSletter</h3>
                    <p>Fique por dentro das promoções e novidades</p>

                </aside>

                <aside className={estiloJson.formSend}>

                    <div className={estiloJson.boxInputSend}>

                        <FontAwesomeIcon className={estiloJson.iconSend} icon={faEnvelope} />
                        <input autoComplete='off' placeholder='Seu melhor e-mail' type="email" name="mail" id="idmail" />

                    </div>

                    <button> <FontAwesomeIcon className={estiloJson.iconPaper} icon={faPaperPlane} />   Cadastrar</button>

                </aside>

            </section>


            <section id='idcontato' className={estiloJson.boxContatos}>

                <section className={estiloJson.boxContatosTexto}>

                    <section className={estiloJson.faleConosco}>

                        <h3>Fale Conosco</h3>
                        <ul>
                            <li>Atendimento</li>
                            <li>Acompanhe seu pedido</li>
                            <li>Abra um chamado</li>
                            <li>Envie um e-mail</li>
                        </ul>
                    </section>

                    <section className={estiloJson.institucional}>
                        <h3>Institucional</h3>
                        <ul>
                            <li>Trabalhe conosco</li>
                            <li>Eventos</li>
                            <li>Serviços</li>
                            <li>Conteudos e dicas</li>
                            <li>Lojas físicas</li>
                        </ul>
                    </section>

                    <section className={estiloJson.suporte}>
                        <h3>Suporte</h3>
                        <ul>
                            <li>Politicas de privacidade</li>
                            <li>Politicas de entrega</li>
                            <li>politiacs de troca e devolução</li>
                            <li>politicas de pagamento</li>
                        </ul>
                    </section>

                </section>

                <section className={estiloJson.boxContatosPagamento}>

                    <section className={estiloJson.boxFormasdePgt}>

                        <h3>Pagamento</h3>

                        <div className={estiloJson.iconsBandeiras}>
                            {

                                redes.map((redes, index) => {

                                    return (

                                        <Image key={index} width={50} height={50} className={estiloJson.iconBandeiras} src={redes.src} />
                                    )
                                }).splice(4)
                            }
                        </div>

                    </section>

                    <section className={estiloJson.boxredesSociais}>

                        <h3>Redes Sociais</h3>

                        <section className={estiloJson.boxIconsRedes}>

                            {

                                redes.map((redes, index) => {

                                    return (

                                        <Image key={index} className={estiloJson.iconRedes} width={50} height={50} src={redes.src} />
                                    )

                                }).splice(0, 4)

                            }

                        </section>

                    </section>

                </section>



            </section>

            <section className={estiloJson.boxPaiEscondido}>

                <section className={estiloJson.boxListasEscondidas}>



                    <div className={estiloJson.boxTx}>
                        <h3>Fale Conosco</h3>
                        <FontAwesomeIcon className={`${estiloJson.setaEscondida}`} icon={faChevronRight} />
                    </div>

                    <ul>
                        <li>Atendimento</li>
                        <li>Acompanhe seu pedido</li>
                        <li>Abra um chamado</li>
                        <li>Envie um e-mail</li>
                    </ul>

                </section>

                <section className={estiloJson.boxListasEscondidas}>



                    <div className={estiloJson.boxTx}>
                        <h3>Institucional</h3>
                        <FontAwesomeIcon className={`${estiloJson.setaEscondida} `} icon={faChevronRight} />
                    </div>

                    <ul>
                        <li>Trabalhe conosco</li>
                        <li>Eventos</li>
                        <li>Serviços</li>
                        <li>Conteudos e dicas</li>
                        <li>Lojas físicas</li>
                    </ul>

                </section>


                <section className={estiloJson.boxListasEscondidas}>



                    <div className={estiloJson.boxTx}>
                        <h3>Suporte</h3>
                        <FontAwesomeIcon className={`${estiloJson.setaEscondida} `} icon={faChevronRight} />
                    </div>

                    <ul>
                        <li>Policitas de privacidade</li>
                        <li>Politicas de entrega</li>
                        <li>Politica de troca e devolução</li>
                        <li>Politica de pagamento</li>
                        <li>Politica de troca e devolução</li>
                    </ul>

                </section>

                <section className={estiloJson.boxListasEscondidas}>



                    <div className={estiloJson.boxTx}>
                        <h3>Pagamento</h3>
                        <FontAwesomeIcon className={`${estiloJson.setaEscondida} `} icon={faChevronRight} />
                    </div>

                    <div className={estiloJson.boxImagens}>

                        {
                            redes.map((redes, index) => {

                                return (

                                    <Image className={estiloJson.iconEsconde} key={index} width={50} height={50} src={redes.src} />
                                )

                            }).splice(4)
                        }

                    </div>

                </section>


                <section className={estiloJson.boxListasEscondidas}>



                    <div className={estiloJson.boxTx}>
                        <h3>Redes Sociais</h3>
                        <FontAwesomeIcon className={`${estiloJson.setaEscondida} `} icon={faChevronRight} />
                    </div>

                    <div className={estiloJson.boxImagens}>

                        {
                            redes.map((redes, index) => {

                                return (

                                    <Image className={estiloJson.iconEsconde} key={index} width={50} height={50} src={redes.src} />
                                )

                            }).splice(0, 4)
                        }

                    </div>

                </section>

            </section>

            
            <section className={`${estiloJson.boxMenuEscondido} ${cond ? estiloJson.menuEscondidoAbre : estiloJson.menuEscondidoFecha}`}>

                <div className={estiloJson.menuTxEscondido}>
                    <h3>Explorar</h3>
                    <FontAwesomeIcon onClick={()=>openMenuEscondido('fecha') }  className={estiloJson.iconXis} icon={faX}/>
                </div>

                <div className={estiloJson.listaDepEscondidas}>
                        <ul>
                            <li onClick={()=> setCondSub(true)}>Departamentos <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/> </li>
                            <li>Promoções do dia <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/>  </li>
                            <li>Cupons <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/>  </li>
                            <li>Serviços <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/>  </li>
                            <li>Dicas <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/>  </li>
                            <li>Suporte <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/>  </li>
                        </ul>
                </div>

                <div className={`${estiloJson.subMenuEscondido} ${condSub ? estiloJson.animaSubOn : estiloJson.animaSubOff}`}>

                  
                        <h3 onClick={()=> setCondSub(false)}  className={estiloJson.boxTxSubmenuEscondido}> <FontAwesomeIcon className={estiloJson.setaCabo} icon={faArrowRight}/>Voltar</h3> 
                           
                  

                        <ul className={estiloJson.listaSubmenuEscondido}>
                            {
                            depart.map((depart , index)=>{

                                return(

                                    <li key={index}>{depart.name} <FontAwesomeIcon className={estiloJson.iconSeta} icon={faChevronRight}/> 

                                            {/* caso queira mostrar as categorias é so descomentar e estilizar */}
                                            {/* <li>

                                                {
                                                    depart.categories.map((dep)=>{

                                                        return(

                                                            dep.name
                                                        )
                                                    })
                                                }


                                            </li> */}

                                     </li>
                                            
                                    
                                    

                                    
                                )
                            })

                            }
                        </ul>

                </div>
                    

            </section>





        <section className={estiloJson.footer}>
                        
                
                <p>Desenvolvido por Ramon da silva Lopes : &copy; {new Date().getFullYear()}  </p>
               
                        
        </section>

                    


        </section>



    )
}