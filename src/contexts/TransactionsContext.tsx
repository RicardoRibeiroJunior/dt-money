import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transaction{
    id:number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?:string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}

interface CreateTransactionInput{
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({children} : TransactionsProviderProps){


    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?:string){

        if(query == null || query == ""){
            const response = await api.get('/transactions')
            setTransactions(response.data)
        }else{
            try{
                const response = await api.get(`/transactions/description/${query}`)
                setTransactions(response.data)
            }catch(err){
                setTransactions([]);
            }
            
        }

        
    }

    async function createTransaction(data: CreateTransactionInput){
        const reponse = await api.post('/transactions', {
            description: data.description,
            category: data.category,
            price: data.price,
            type:data.type,
            createdAt: new Date(),
        })

        setTransactions(state => [reponse.data, ...state]);
    }

    async function deleteTransaction(id: number){
        await api.delete(`/transactions/${id}`).then(response => {
            const NewTransactions = transactions.filter(
                transaction => transaction.id != id
            )

            setTransactions(NewTransactions);
        });
    }
    
    useEffect(() => {
        fetchTransactions();
    },[]);

    return(
        <TransactionContext.Provider value={{transactions, fetchTransactions, createTransaction, deleteTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}