import useLogic from "./logic/dashboard"

const Dashboard = () => {
    const { connectToWallet,
        account,
        active,
        totalSupply,
        fetchTokenSupply,
        fetchTokenBal,
        balOf,
        createAllowance,
        allowance,
        setAlowance,
        allowanceRec,
        setAllowRec,
        isAllowanceCreated,
        transferFromAddre,
        settransferFromAddre,
        transferToAddre,
        settransferToAddre,
        transAmt,
        setTransAmt,
        transferFrom,
        isTransFrom
    } = useLogic()

    if (!account) {
        return <div className="w-screen h-screen bg-[#F9FBFB] flex justify-center flex-col items-center">
            <div className="flex justify-center flex-col items-center">
                <p>connect to wallet to explore </p>
                <button
                    className="font-bold bg-[#009393]
                    p-4 h-[50px] w-auto rounded-xl text-white flex justify-center items-center"
                    onClick={connectToWallet}>connect</button>

            </div>

        </div>
    }

    
    return <div className="w-screen min-h-screen  bg-[#F9FBFB] flex justify-center flex-col items-center">
        <h3 className="font-bold text-[25px] mb-5 text-[]">Interface showing the core functionality of ERC20 Token </h3>
        <section className="w-[50%] rounded-xl min-h-[400px] bg-[#F9FBFB] shadow-2xl p-5 flex justify-center items-center flex-col">
            <div className="w-1/2  flex justify-between items-center">
                <button className="font-bold bg-[#009393]
                    p-4 h-[50px] w-auto rounded-xl text-white flex justify-center items-center" onClick={fetchTokenSupply}>GetTotalSupply</button>
                {totalSupply ?  <p>totalSupply: {totalSupply}</p>:null }
               
            </div>
            <div className="w-1/2  flex justify-between items-center">
                <button
                    className="font-bold bg-[#009393] p-4 h-[50px] mt-2 w-auto
                    rounded-xl text-white flex justify-center items-center" onClick={fetchTokenBal}>GetBalanceOf</button>
                {balOf ? balOf:null}
            </div>
            
            <div className="w-1/2 flex justify-between items-center flex-col">
                <input placeholder="allowance amount" className="h-[50px] border-[#009393] border-[1px] m-2 rounded-xl p-2 " value={allowance} onChange={(e)=> setAlowance(e.target.value)}></input>
                <input placeholder="allowance receiver" className="h-[50px] border-[#009393] border-[1px] m-2 rounded-xl p-2 " value={allowanceRec} onChange={(e)=> setAllowRec(e.target.value)}></input>

                {isAllowanceCreated === false ? <button
                    onClick={createAllowance}
                    className="font-bold bg-[#009393] p-4 h-[50px] mt-2 w-auto
                    rounded-xl text-white flex justify-center items-center" >
                    createAllowance</button> : "....allowance is being"}
            
            </div>
            <div className="w-1/2 flex justify-between items-center flex-col">
            <input placeholder="allowance provider" className="h-[50px] border-[#009393] border-[1px] m-2 rounded-xl p-2 " value={transferFromAddre} onChange={(e)=> settransferFromAddre(e.target.value)}></input>
            <input placeholder="allowance receiver" className="h-[50px] border-[#009393] border-[1px] m-2 rounded-xl p-2 " value={transferToAddre} onChange={(e)=> settransferToAddre(e.target.value)}></input>
            <input placeholder="allowance amount" className="h-[50px] border-[#009393] border-[1px] m-2 rounded-xl p-2 " value={transAmt} onChange={(e)=> setTransAmt(e.target.value)}></input>

                { !isTransFrom ? <button
                    onClick={transferFrom}
                    className="font-bold bg-[#009393] p-4 h-[50px] mt-2 w-auto
                    rounded-xl text-white flex justify-center items-center">tranferFrom </button> :"... transfer in progress"}  
                
            </div>
            <div className="w-full">
                <button
                    className="font-bold bg-[#009393] p-4 h-[50px] mt-2 w-auto
                    rounded-xl text-white flex justify-center items-center">transfer</button>
            </div>
  

        </section>
        
    </div>
}

export default Dashboard