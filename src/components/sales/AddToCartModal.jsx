import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

const AddToCartModal = ({ stateModalCart, setStateModalCart, handleAddToCart, code, name, stock }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (stateModalCart) {
            setQuantity(1);
        }
    }, [stateModalCart]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const product = { code, name, stock, quantity };

        try {
            const responseData = await handleAddToCart(product);
            console.log(responseData);
            setStateModalCart(false);

            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                text: 'El producto ha sido agregado al carrito.',
            });
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al agregar el producto al carrito.',
            });
        }
    };

    return (
        <>
            {stateModalCart && (
                <Overlay>
                    <ModalContainer>
                        <form onSubmit={handleSubmit}>
                            <div className='signup-container'>
                                <div className='left-container'>
                                    <div className='logo'>
                                        <h1>
                                            <a href="index.html"><img alt="logoPrendyD" src="images/InicioR.png"/></a>
                                        </h1>
                                    </div>
                                    <div className='puppy'>
                                        <img
                                            src='images/puppy3.png' alt='prendyPuppy'/>
                                    </div>
                                </div>
                                <div className='right-container'>
                                    <header>
                                        <h1>Desea agregar el producto al carrito?</h1>
                                        <div className='set'>
                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Código</label>
                                                <input type="number"
                                                       id="code"
                                                       name="code"
                                                       value={code}
                                                       disabled/>
                                            </div>

                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Nombre</label>
                                                <input type="text"
                                                       id="name"
                                                       name="name"
                                                       value={name}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className='set'>
                                            <div className='pets-name'>
                                                <div className='Arrow'>
                                                    <label htmlFor='pets-name'>Cantidad</label>
                                                    <input placeholder="Existencias del producto"
                                                           type="number"
                                                           id="stock1"
                                                           name="stock" required={true} min="1" max={stock} step="1"
                                                           value={quantity}
                                                           onChange={(event) => setQuantity(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <footer>
                                        <div className='set'>
                                            <CloseButton id='back' onClick={() => setStateModalCart(false)}>Cancelar</CloseButton>
                                            <button type="submit" id='next' >Agregar</button>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </form>
                    </ModalContainer>
                </Overlay>
            )}
        </>
    );
}

export default AddToCartModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  Left: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: absolute;
  border-radius: 5px;
  z-index: 999;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1A5840;
  }
`;

const CloseButton = styled.button`
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: .3s ease all;
  border-radius: 5px;
  color: #1A5840;
  background: transparent;

  &:hover {
    background: #E8E8E8;
  }
`;

const SubmitButton = styled.button`
  top: 200px;
  right: 40px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: .3s ease all;
  color: #1A5840;
  background: transparent;
`;