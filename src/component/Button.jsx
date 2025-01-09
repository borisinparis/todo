const Button = (props) => {
    const {text , style , onClick} = props;

    return ( 
        <button onClick={onClick} style={style}> {text} </button>
    )
}
