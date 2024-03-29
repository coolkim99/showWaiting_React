import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import OrderItem from "./OrderItem";


const Span = styled(Responsive)`
    color : gray;
    margin-top : 20px;
    transform: translateX(30px);
`

const NewOrderBlock = styled(Responsive)`
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding : 15px;
    transform: translateX(30px);
    padding-bottom : 40px;
    border-bottom : 1px dashed lightgray;
`;

const NewOrders = ({ orderings, loading }) => {

    const [check, setCheck] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(orderings);
      if(orderings && orderings.length === 0){
        setCheck(true);   //게시글 존재 여부 판단
        setCount(0);
      } else {
        setCheck(false);
        setCount(orderings.length);
      }
    }, [orderings])

    return (
        <>
        <Span>들어온 주문 (<span style={{color: "red"}}>{count}</span> 개)</Span>
        <NewOrderBlock>
            
        {check && 
            <div style={{fontSize: '1.2rem', fontWeight: 'bold', padding:'4% 0'}}>
                들어온 주문이 없습니다.</div>}

        {!loading && orderings && (
            <div>
            {orderings.map(ordering => (
                <OrderItem orderItem={ordering} key={ordering.id} />
            ))}
            </div>
        )}
        </NewOrderBlock>
        </>
    );
}

export default NewOrders;