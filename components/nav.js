import Link from 'next/link';

const Nav = () => {
    return (
        <div>
            <Link href="/">
              <a className='home'>Home</a>
            </Link>
            <Link href="/about">
              <a >About</a>
            </Link>
            <style jsx>{`
        a{
            color: #555;
            padding: 10px 20px;
            display:inline-block;
            text-decoration: none;
            background: #fff;
            border: 1px solid grey;
            margin-right: 10px
        };
        a:hover {
            background:blue;
            color:#fff
        };
        a:active {
            background:green;
            color:#fff
        }
       
       `}</style>
        </div>
    )
}

export default Nav