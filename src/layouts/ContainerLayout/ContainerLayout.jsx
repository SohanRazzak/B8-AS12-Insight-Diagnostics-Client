import {PropType} from 'prop-types';

const ContainerLayout = ({children}) => {
    return (
        <div className='max-w-6xl mx-auto'>
            {children}
        </div>
    );
};

ContainerLayout.propTypes = {
    children: PropType.node
}

export default ContainerLayout;