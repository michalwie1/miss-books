const { useState } = React

export function LongTxt({ txt, length = 100 }){

    const [isFullTxt, setIsFullTxt] = useState(false)

    function onReadToggle(){
        setIsFullTxt(!isFullTxt)
    }

    if (txt.length <= length) return <div>{txt}</div>

    return (
        <div className="long-txt">
            {isFullTxt
            ? <p>
                <span>{txt}</span>
                <a onClick={onReadToggle}>... Read less</a>
              </p>
            : <p>
                <span>{txt.substring(0,length)}</span>
                <a onClick={onReadToggle}>... Read more</a>
             </p>
            }
            
        </div>
    )
    
}