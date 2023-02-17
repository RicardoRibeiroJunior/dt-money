import clipBoard from '../../assets/clipboard.svg';
import { EmptyContainer } from './styles';

export function Empty(){
    return(
        <EmptyContainer>
            <img src={clipBoard} alt=''/>
            <p>Sem transação.</p>
        </EmptyContainer>
    )
}