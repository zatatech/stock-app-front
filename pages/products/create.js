
import {useState} from 'react'

function Create() {
    const initialState = {name:'',price:0}
    const[product,setProduct] = useState(initialState)

    const my_handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setProduct({
            ...product,
            [inputName]: inputValue,
        })
    }

    const my_handleClick = (e) => {
        e.preventDefault()  //previene que el form por defecto actue como submit

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products` , {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then((res) => res.json() )
            .then((data) => { 
                  setProduct(initialState)  
                  console.log({data})
            })
        .catch((err) => {console.log({err})})
    }
    
    
    
    return (
        <>
            <div>
                <h1>Creando el producto</h1>        

                <form>
                    <input type='text' name='name'  value={product.name}  onChange={my_handleChange}></input>
                    <input type='text' name='price' value={product.price} onChange={my_handleChange}></input>
                    <button onClick={my_handleClick}>crea pdto</button>
                </form>
            </div>
            <style jsx>{`
            
                form{
                    display:flex;
                    flex-direction:column;
                    width:20rem;
                    margin: 0 auto;
                }
                input {
                    margin-bottom: 0.5rem;
                }
                
                h1 {
                    text-align:center;  
                }

            `}
            </style>
        </>
    )
}

export default Create