import React from 'react';
import { connect } from 'react-redux';
import { savePadreBD } from '../../redux/thunk/padreThunk';

/* AddProduct не совсем контейнер, он просто вызывает диспатч,
  ему не нужен стор, поэтому мы можем создать коннект коротким путем:
  AddProduct = connect()(AddProduct); */
const AddProduct = ({ addMyProduct }) => {
  let inputSKUNumber;
  let inputProductName;
  return (
    <div>
      <input
        ref={(node) => {
          inputSKUNumber = node;
        }}
        placeholder="SKU Number"
      />
      <input
        ref={(node) => {
          inputProductName = node;
        }}
        placeholder="Product name"
      />
      <button
        onClick={() => {
          addMyProduct({ SKUNumber: inputSKUNumber.value, name: inputProductName.value });
          inputSKUNumber.value = '';
          inputProductName.value = '';
        }}
      >
        Add Product
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
    addMyProduct: (params) => dispatch(savePadreBD(params))
});

export default connect(null, mapDispatchToProps)(AddProduct);


