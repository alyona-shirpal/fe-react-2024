import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CartIcon } from '@/assets/icons/Cart.tsx';
import { LeftArrowIcon } from '@/assets/icons/LeftArrow.tsx';
import { RightArrowIcon } from '@/assets/icons/RightArrow.tsx';
import { DesktopOnly, MobileOnly } from '@/components/media-helpers/MediaHelpers.tsx';
import { useCart } from '@/contexts/CartContextProvider.tsx';
import type { Product } from '@/types/interfaces/Product.ts';
import { fetchProduct } from '@/utils/fetchApi.ts';

import styles from './productDetail.module.css';

export const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [mainImage, setMainImage] = useState('');

    const cart = useCart();

    const handleCartClick = () => {
        if (product) {
            cart.toggleItem(product.id);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProductById = async () => {
                try {
                    const fetchedProduct = await fetchProduct(id);
                    if (fetchedProduct) {
                        setProduct(fetchedProduct);
                        setMainImage(fetchedProduct.images[0]);
                    } else {
                        navigate('/not-found');
                    }
                } catch {
                    navigate('/not-found');
                }
            };

            fetchProductById();
        }
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleThumbnailClick = (image: string) => {
        setMainImage(image);
    };

    const handleNextImage = () => {
        if (product) {
            const currentIndex = product.images.indexOf(mainImage);
            const nextIndex = (currentIndex + 1) % product.images.length;
            setMainImage(product.images[nextIndex]);
        }
    };

    const handlePreviousImage = () => {
        if (product) {
            const currentIndex = product.images.indexOf(mainImage);
            const previousIndex = (currentIndex - 1 + product.images.length) % product.images.length;
            setMainImage(product.images[previousIndex]);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.detailWrapper}>
                <div className={styles.photosWrapper}>
                    <div className={styles.thumbnailWrapper}>
                        {product?.images.map((item, index) => (
                            <img
                                src={item}
                                alt="Product"
                                key={index}
                                onClick={() => handleThumbnailClick(item)}
                                className={styles.thumbnail}
                            />
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <button className={styles.leftArrow} onClick={handlePreviousImage}>
                            <LeftArrowIcon disable={false} />
                        </button>
                        <img src={mainImage} alt={product?.title || 'Product Image'} />
                        <button className={styles.rightArrow} onClick={handleNextImage}>
                            <RightArrowIcon disable={false} />
                        </button>
                    </div>
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.backWrapper}>
                        <button className={styles.backButton} onClick={handleBackClick}>
                            <span>
                                <LeftArrowIcon disable={false} />
                            </span>
                            Back
                        </button>
                        <MobileOnly>
                            <button className={styles.addToCartButton} onClick={handleCartClick}>
                                <CartIcon color={'white'} /> Add to cart
                            </button>
                        </MobileOnly>
                    </div>
                    <h1 className={styles.title}>{product?.title}</h1>
                    <div className={styles.categoryName}> {product?.category.name}</div>
                    <div className={styles.description}> {product?.description}</div>

                    <div className={styles.priceWrapper}>
                        <div className={styles.priceWrap}>
                            <div className={styles.cardPrice}>{product?.price}</div>
                            <p className={styles.hryvna}>₴</p>
                        </div>

                        <DesktopOnly>
                            <div>
                                <button className={styles.addToCartButton} onClick={handleCartClick}>
                                    <CartIcon color={'white'} /> Add to cart
                                </button>
                            </div>
                        </DesktopOnly>
                    </div>
                </div>
            </div>
        </div>
    );
};
