export default interface ICard {
    _id: string,
    title: string,
    description: string,
    category: string,
    brand: string,
    image: {
        url: string,
        alt: string,
    },
    reviews: Array<{
        rating: number,
        comment: string,
        reviewerName: string,
    }>,
    price: number,
    rating: number,
    stock: boolean,
    createdAt: string,
    updatedAt: string,
}
