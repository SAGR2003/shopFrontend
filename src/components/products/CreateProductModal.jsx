import React, {useEffect} from "react";
import styled from "styled-components";
import {postProduct} from "../../requests/products/postProduct";

const CreateProductModal = ({
                                stateModal,
                                setStateModal,
                                code,
                                name,
                                unitValue,
                                stock,
                                setCode,
                                setName,
                                setUnitValue,
                                setStock,
                                loadProducts,
                            }) => {

    const addProduct = (event) => {
        event.preventDefault();

        let product = {
            code: code,
            name: name,
            unitValue: unitValue,
            stock: stock,
        }
        postProduct(product);
        setStateModal(false);
        loadProducts();
    };

    useEffect(() => {
        if (stateModal) {
            setCode("");
            setName("");
            setUnitValue("");
            setStock("");
        }
        loadProducts();
    }, [stateModal, setCode, setName, setUnitValue, setStock]);

    return (
        <>
            {stateModal &&
                <Overlay>
                    <ModalContainer>
                        <form onSubmit={addProduct} id="formulario">
                            <div className='signup-container'>
                                <div className='left-container'>
                                    <div className='logo'>
                                        <h1>
                                            <a href="index.html"><img alt="logoPrendyD" src="images/InicioR.png"/></a>
                                        </h1>
                                    </div>
                                    <div className='puppy'>
                                        <img
                                            src='images/puppy.png' alt='prendyPuppy'/>
                                    </div>
                                </div>
                                <div className='right-container'>
                                    <header>
                                        <h1>Crea un producto que destaque en todos los momentos.</h1>
                                        <div className='set'>
                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Código</label>
                                                <input placeholder="Código del producto"
                                                       type="number"
                                                       id="code"
                                                       name="code" min="1" max="999999999" step="1"
                                                       value={code}
                                                       pattern="[0-9]" required={true} maxLength={9}
                                                       onChange={(event) => setCode(event.target.value)}/>
                                            </div>
                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Nombre</label>
                                                <input type="text"
                                                       id="name"
                                                       name="name"
                                                       value={name}
                                                       placeholder="Nombre del producto"
                                                       required={true} minLength={3}
                                                       onChange={(event) => setName(event.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='set'>
                                            <div className='pets-breed'>
                                                <label htmlFor='pets-breed'>Valor unitario</label>
                                                <input type="number"
                                                       id="unitValue"
                                                       name="unitValue" required={true} min="1" max="999999999" step="1"
                                                       value={unitValue}
                                                       placeholder="Producto valor unitario"
                                                       onChange={(event) => setUnitValue(event.target.value)}/>
                                            </div>
                                            <div className='pets-name'>
                                                <label htmlFor='pets-name'>Existencias</label>
                                                <input placeholder="Existencias producto"
                                                       type="number"
                                                       id="stock"
                                                       name="stock" required={true} min="1" max="999999999" step="1"
                                                       value={stock}
                                                       onChange={(event) => setStock(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </header>
                                    <footer>
                                        <div className='set'>
                                            <CloseButton id='back'
                                                         onClick={() => setStateModal(false)}>Volver</CloseButton>
                                            <SubmitButton type="submit" id='next'>Crear</SubmitButton>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </form>
                    </ModalContainer>
                </Overlay>
            }
        </>
    );
}

export default CreateProductModal;


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
