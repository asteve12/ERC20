import { useWeb3React,UnsupportedChainIdError } from "@web3-react/core"
import { ethers } from "ethers"
import { useState,useEffect } from "react"
import { abi } from "../../abi"
import injected from "../../connector"



const useLogic = () => {
    const [token, setTokenBal] = useState()
    const [totalSupply, setTotalSupply] = useState(null);
    const [balOf, setBalOf] = useState(null)
    const [allowance, setAlowance] = useState(null)
    const [allowanceRec, setAllowRec] = useState(null)
    const [isAllowanceCreated, setIsAllowanceCreated] = useState(false)
    const [transferFromAddre, settransferFromAddre] = useState(null)
    const [transferToAddre, settransferToAddre] = useState(null)
    const [transAmt, setTransAmt] = useState(null)
    const [isTransFrom,setIsTransFrom] = useState(false)
    const { activate, account, active, chainId, error, library, connector } = useWeb3React()
    let contractInstance = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT, abi, library)
    
    useEffect(() => {
        if (error instanceof UnsupportedChainIdError) {
           if(Boolean(connector.supportedChainIds) && !connector.supportedChainIds.includes(chainId)) {
                alert("blockchain connected to not supported")
              }
            
          
      }
      
    }) 
    

//connect to wallet
   const connectToWallet = () => {
        if (!window.ethereum) {
            return alert("no wallet installed")
        }
        activate(injected)
        
    }

//fetch token balance 
    const fetchTokenSupply = async () => {
        alert("totalsuply")
        let tokenSup = ethers.utils.formatUnits(await contractInstance._totalSupply(), "ether")
        setTotalSupply(tokenSup)
        

        
    }
//get token Balance 
    const fetchTokenBal = async () => {
        let contractInstance = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT, abi, library)
        let tokenSup = ethers.utils.formatUnits(await contractInstance.balanceOf(account), "ether");
        setBalOf(tokenSup)
        
    }

//create allowance
    const createAllowance = async () => {
        if (!allowance) return alert("please enter a valid value");
        if (!active) return alert("please connect to wallet to create allowance")
        if (!allowance && !allowanceRec) return alert("fill in form to create allowance")
        setIsAllowanceCreated(true)
        let contractInstance = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT, abi, library.getSigner())
        
        let tx = await contractInstance.approve(allowanceRec, parseInt(allowance))
        let transRec = await tx.wait()
        if (transRec) {
            alert("allowance created successfully")
            setIsAllowanceCreated(false)
            setAlowance("")
            setAllowRec("")
        }
    
    }

//send amount approve to spend on behalf 
    const transferFrom = async () => {
        
        try {
            if(!transAmt && !transferToAddre && !transferFromAddre) return alert("please ensure all valued are entered") 
            if(!active) return alert("please connect to wallet to perform operation")
            
            setIsTransFrom(true)
            let contractInstance = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT, abi, library.getSigner())
            let tx = await contractInstance.transferFrom(transferFromAddre, transferToAddre, parseInt(transAmt))
            if (await tx.wait()) {
                alert("transfer done successfully")
                setIsTransFrom(true)
    
            }
            
    }
    catch (e) {
        alert(`error occurred: ${e.error}`)
    }
        
        
    }

  //help transfer token to address inputted
//   const transfer = ()  


   
 



    return {
        connectToWallet,
        account,
        active,
        fetchTokenSupply,
        totalSupply,
        fetchTokenBal,
        balOf,
        createAllowance,
        allowance,
        setAlowance,
        allowanceRec,
        setAllowRec,
        isAllowanceCreated,
        setIsAllowanceCreated,
        transferFromAddre,
        settransferFromAddre,
        transferToAddre,
        settransferToAddre,
        transAmt,
        setTransAmt,
        transferFrom,
        isTransFrom,
        setIsTransFrom
    }

    

} 


export default useLogic