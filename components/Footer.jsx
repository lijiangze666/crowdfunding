import React from 'react';

const Footer = () => {
    const productList = ["Market", "ERC20 Token", "Donation"];
    const contractList = ["support@cryptokitties.io", "info@example.com", "Contact us"];
    const usefulLinks = ["Home", "Abouts Us", "Company Bio"];
    return (
        <footer className="text-center text-white backgroundMain lg:text-left">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                            Crypto king
                        </h6>
                        <p>
                            Here you can use rows and columns to organize your footer
                            content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Product
                        </h6>
                        {productList.map((product, i) => (
                            <p className="mb-4" key={i + 1}>
                                <a
                                    href="#!"
                                >
                                    {product}
                                </a>
                            </p>
                        ))}
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Useful Links
                        </h6>
                        {usefulLinks.map((link, i) => (
                            <p className="mb-4" key={i + 1}>
                                <a
                                    href="#!"
                                >
                                    {link}
                                </a>
                            </p>
                        ))}
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Contract
                        </h6>
                        {contractList.map((contract, i) => (
                            <p className="mb-4" key={i + 1}>
                                <a
                                    href="#!"
                                >
                                    {contract}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="backgroundMain p-6 text-center">
                <span> Copyright © 2024 - All right reserved</span>
                <a className="font-semibold" href="https://tailwindcss.com">
                    Crypto king
                </a>
            </div>
        </footer>
    );
};

export default Footer;
