import {PropType} from 'prop-types';

const ContainerLayout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

ContainerLayout.propTypes = {
    children: PropType.node
}

export default ContainerLayout;