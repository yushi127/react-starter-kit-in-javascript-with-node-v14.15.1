import {useEffect, useState} from "react";

const defaultDimensions ={width:0,heigh:0};

const useDimensions = (targetRef)=>{
    let [dimensions,setDimensions] = useState(defaultDimensions)
    const node = targetRef.current;
    const updateDimensions=(node)=>{
      return node === null
          ? defaultDimensions
          :{
              heigh: node.offsetHeigh,
              width: node.offsetWidth,
          }
    };
    dimensions = updateDimensions(node);
    useEffect(()=>{
        const resizeDimensions = ()=>{
            setDimensions(updateDimensions(node))
        };
        window.removeEventListener('resize',resizeDimensions);
        window.addEventListener('resize',resizeDimensions);
    },[node])
    return dimensions;
    };
    
export default useDimensions;