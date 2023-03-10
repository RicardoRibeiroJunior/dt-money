import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { useContext } from 'react';
import { TransactionContext } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;



export function NewTransactionModal(){

    const { createTransaction } = useContext(TransactionContext);

    const { register, handleSubmit, control, reset } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type:'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        
        await createTransaction({
            description: data.description,
            category: data.category,
            price: data.price,
            type:data.type,
        })

        reset();
    }

    return(
        <Dialog.Portal>
            <Overlay/>

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input {...register('description')} type="text" placeholder="Descrição" required/>
                    <input {...register('price', {valueAsNumber:true})} type="number" placeholder="Preço" required/>
                    <input {...register('category')} type="text" placeholder="Categoria" required/>

                    <Controller
                        control={control}
                        name="type"
                        render={({field}) =>{
                            
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value="income">
                                        <ArrowCircleUp size={24}/>
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value="outcome">
                                        <ArrowCircleDown size={24}/>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>

                
            </Content>
        </Dialog.Portal>
    )
}