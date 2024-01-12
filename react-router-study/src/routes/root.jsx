import { useEffect } from 'react';
import { Form, NavLink, Link, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { createContact, getContacts } from '../contacts';

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    return { contacts, q };
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    // The navigation.location will show up when the app is navigating to a new URL and loading the data for it. It then goes away when there is no pending navigation anymore.
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

    useEffect(() => {
        document.getElementById('q').value = q;
    }, [q]);
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    {/*<form id="search-form" role="search">*/}
                    {/*    <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />*/}
                    {/*    <div id="search-spinner" aria-hidden hidden={true} />*/}
                    {/*    <div className="sr-only" aria-live="polite"></div>*/}
                    {/*</form>*/}
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            className={searching ? 'loading' : ''}
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>

                    {/*<form method="post">*/}
                    {/*    <button type="submit">New</button>*/}
                    {/*</form>*/}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        /!*<a href={`/contacts/1`}>Your Name</a>*!/*/}
                    {/*        /!* immediately render new UI, You can open the network tab in the browser devtools to see that it's not requesting documents anymore. *!/*/}
                    {/*        <Link to={`contacts/1`}>Your Name</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        /!* the browser is doing a full document request  *!/*/}
                    {/*        <a href={`contacts/2`}>Your Friend</a>*/}
                    {/*        /!*<Link to={`contacts/1`}>Your Name</Link>*!/*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    {/*<Link to={`contacts/${contact.id}`}>*/}
                                    {/*    {contact.first || contact.last ? (*/}
                                    {/*        <>*/}
                                    {/*            {contact.first} {contact.last}*/}
                                    {/*        </>*/}
                                    {/*    ) : (*/}
                                    {/*        <i>No Name</i>*/}
                                    {/*    )}{' '}*/}
                                    {/*    {contact.favorite && <span>★</span>}*/}
                                    {/*</Link>*/}
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive ? 'active' : isPending ? 'pending' : ''
                                        }>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{' '}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <Outlet>
                <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}></div>
            </Outlet>
        </>
    );
}
