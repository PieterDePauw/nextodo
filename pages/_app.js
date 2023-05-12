function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([Wait(800), Wait(500), Wait(500)]).then(() => {
            setLoading(false);
        });

        const handleStart = (url) => {
            if (url !== router.pathname) {
                setLoading(true);
            }
        };
        const handleComplete = (url) => {
            if (url !== router.pathname || url === router.pathname) {
                setLoading(false);
            }
        };
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>Nextodo | Ma TodoList</title>
                <meta charSet="UTF-8" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.ico" />
                <link rel="stylesheet" href="/styles/style.css" />
            </Head>
            <LoadingScreen loading={loading} />
            {!loading && (
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            )}
        </>
    );
}
