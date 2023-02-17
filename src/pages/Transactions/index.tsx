import { useContext} from "react";
import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./Components/SearchForm";

import { PriceHighlight, TransactionContainer, TransactionTable } from "./styles";

import trash from '../../assets/trash.svg';
import { Empty } from "../../Components/Empty";




export function Transactions(){

   const { transactions, deleteTransaction } = useContext(TransactionContext);

    return(
        <div>
            <Header/>
            <Summary/>

            <TransactionContainer>

                <SearchForm/>

                    {transactions.length == 0 ? <Empty/> :
                
                    <TransactionTable>
                        <tbody>                  
                            {transactions.map(transaction => {
                                return(
                                    <tr key={transaction.id}>
                                        <td width="40%">{transaction.description}</td>
                                        <td>
                                            <PriceHighlight variant={transaction.type}>
                                                {transaction.type == 'outcome' && '- '}
                                                {priceFormatter.format(transaction.price)}
                                            </PriceHighlight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                        <td>
                                            <img src={trash} alt='' onClick={() => deleteTransaction(transaction.id)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </TransactionTable>
                    }
            </TransactionContainer>
        </div>
    )
}