import { useNavigate } from "react-router-dom";
import angry from "./../../../public/angry.gif";

export const Angry = () => {
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
                        Look at what you did !!!!
                    </h1>
                    <br></br>
                    <img
                    src={angry}
                    alt="Ending"
                    width="80%"
                    />
                    <br></br>
                    <button
                    className="btn btn-primary mt-4"
                    onClick={() => navigate("/")}
                    style={{ backgroundColor: 'white', borderColor: 'red', color: 'black', fontSize: '20px', fontFamily: 'Gill Sans' }}
                    >
                    Want to give it another try ? 
                    </button>
                </div>
                <br></br>
            </div>
        </div>
    );
};

export default Angry;