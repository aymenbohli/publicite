<?php
/**
 * Created by PhpStorm.
 * User: AymenB
 * Date: 17/01/2020
 * Time: 15:40
 */

namespace App\Service;


use App\Entity\Article;
use App\Repository\ArticleRepository;


class ArticleService
{

    public function countArticle()
    {
        $articleRepository=new ArticleRepository();
        $products = $articleRepository->findAll();
        return $products;
    }

}