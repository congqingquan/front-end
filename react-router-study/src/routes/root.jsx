import { Link, Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            {/*<a href={`/contacts/1`}>Your Name</a>*/}
                            {/* immediately render new UI, You can open the network tab in the browser devtools to see that it's not requesting documents anymore. */}
                            <Link to={`contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            {/* the browser is doing a full document request  */}
                            <a href={`/contacts/2`}>Your Friend</a>
                            {/*<Link to={`contacts/1`}>Your Name</Link>*/}
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet>
                <div id="detail"></div>
            </Outlet>
        </>
    );
}
