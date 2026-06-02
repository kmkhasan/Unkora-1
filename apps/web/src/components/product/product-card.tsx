'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/api/products';
import { useCart } from '@/lib/hooks/use-cart';
import { useLanguage } from '@/lib/i18n/language-context';
import { WishlistButton } from './wishlist-button';
import { PreorderBadge } from './preorder-cta';
import { trackAddToCart } from '@/lib/analytics';

interface ProductCardProps {
  product: Product;
  className?: string;
  listView?: boolean;
}

export function ProductCard({ product, className, listView }: ProductCardProps) {
  const { addItem } = useCart();
  const { lang } = useLanguage();

  const image = product.images?.[0]?.url;
  const isUnsplash = image?.includes('unsplash.com') ?? false;
  const hasDiscount = product.salePrice && Number(product.salePrice) < Number(product.basePrice);
  const price = Number(product.salePrice ?? product.basePrice);
  const discountPct = hasDiscount
    ? Math.round((1 - Number(product.salePrice) / Number(product.basePrice)) * 100)
    : 0;
  const reviewCount = product._count?.reviews ?? 0;
  const inStock = product.stockQuantity > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem.mutate({ productId: product.id, quantity: 1, guestData: { name: product.name, price, image, slug: product.slug } });
    trackAddToCart({ productId: product.id, name: product.name, price });
  };

  /* ── LIST VIEW ─────────────────────────────────────────── */
  if (listView) {
    return (
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          'bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group flex gap-3 p-3',
          className
        )}
      >
        <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
          {image ? (
            <Image src={image} alt={product.name} fill unoptimized={isUnsplash} className="object-cover" sizes="80px" />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl text-gray-200">📚</div>
          )}
          {hasDiscount && (
            <span className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
              -{discountPct}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between min-w-0 py-0.5">
          <div>
            {product.category && (
              <span className="text-[9px] font-bold text-orange-500 uppercase tracking-wider">{product.category.name}</span>
            )}
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-5 mt-0.5">
              {product.name}
            </h3>
            {product.bookDetail?.author && (
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">{product.bookDetail.author}</p>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-gray-900">৳{price.toLocaleString('en-BD')}</span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">৳{Number(product.basePrice).toLocaleString('en-BD')}</span>
              )}
            </div>
            {inStock ? (
              <button
                onClick={handleAddToCart}
                disabled={addItem.isPending}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-700 active:scale-95 transition-all flex-shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'কার্ট' : 'Cart'}
              </button>
            ) : (
              <span className="text-xs text-gray-400 font-medium">{lang === 'bn' ? 'স্টক নেই' : 'Out of stock'}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  /* ── GRID VIEW ─────────────────────────────────────────── */
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 overflow-hidden',
        'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        'group flex flex-col h-full',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            unoptimized={isUnsplash}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 240px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-gray-200 bg-gray-50">📚</div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
              {discountPct}% OFF
            </span>
          )}
          {product.isFeatured && !hasDiscount && (
            <span className="bg-amber-400 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
              {lang === 'bn' ? 'জনপ্রিয়' : 'HOT'}
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-gray-800 text-white px-4 py-1.5 text-xs font-bold shadow-lg">
              {lang === 'bn' ? 'স্টক নেই' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {product.category && (
          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-1">
            {product.category.name}
          </span>
        )}

        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug flex-1 min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.bookDetail?.author && (
          <p className="text-[10px] text-gray-400 truncate mt-0.5">{product.bookDetail.author}</p>
        )}

        {reviewCount > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={cn('w-3 h-3', i < 4 ? 'text-yellow-400' : 'text-gray-200')} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[9px] text-gray-400">({reviewCount})</span>
          </div>
        )}

        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-base font-black text-gray-900">৳{price.toLocaleString('en-BD')}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">৳{Number(product.basePrice).toLocaleString('en-BD')}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-1.5 mt-auto pt-2">
          {/* Row 1: Add to Cart + Wishlist */}
          <div className="flex gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={!inStock || addItem.isPending}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl text-xs font-bold transition-all',
                inStock
                  ? 'bg-gray-900 text-white hover:bg-gray-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{lang === 'bn' ? 'কার্টে যোগ' : 'Add to Cart'}</span>
            </button>
            <WishlistButton
              productId={product.id}
              className="h-9 w-9 flex-shrink-0 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
            />
          </div>

          {/* Row 2: Buy Now */}
          {inStock ? (
            <Link
              href={`/checkout?productSlug=${product.slug}&qty=1`}
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 h-9 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{lang === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}</span>
            </Link>
          ) : (
            <div className="flex items-center justify-center h-9 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold">
              {lang === 'bn' ? 'স্টক নেই' : 'Out of Stock'}
            </div>
          )}
        </div>

        <PreorderBadge
          productId={product.id}
          productSlug={product.slug}
          basePrice={Number(product.basePrice)}
          salePrice={product.salePrice ? Number(product.salePrice) : undefined}
        />
      </div>
    </Link>
  );
}
