import ending from "../../../public/ending.gif"
import { useNavigate } from "react-router-dom";

export const Ending = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <br></br>
                <div className="text-center">
                    <h1
                        style={{
                            fontFamily: 'cursive',
                            fontSize: '4rem',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        And that's a wrap - Have a lovely Valentine's Day Amy, Muaah ! 
                    </h1>
                    <br></br>
                    <img
                    src={ending}
                    alt="Ending"
                    width="80%"
                    />
                    <br></br>
                    <button
                    className="btn btn-primary mt-4"
                    onClick={() => navigate("/")}
                    style={{ backgroundColor: 'white', borderColor: 'red', color: 'black', fontSize: '20px', fontFamily: 'Gill Sans' }}
                    >
                    Go back home
                    </button>
                </div>
                <br></br>
            </div>
        </div>
    );
};

export default Ending;