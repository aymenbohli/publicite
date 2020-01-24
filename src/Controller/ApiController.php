<?php
/**
 * Created by PhpStorm.
 * User: AymenB
 * Date: 17/01/2020
 * Time: 16:06
 */

namespace App\Controller;
use App\Repository\ArticleRepository;
use App\Service\ArticleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


class ApiController  extends AbstractController
{
    /**
     * @Route(
     *     name="countArticle",
     *     path="/countArticle",
     *     methods={"GET"},
     *     defaults={"_api_item_operation_name"="countArticle"}
     * )
     */
    public function countArticle(ArticleRepository $articleRepository): Response
    {
        $products = $articleRepository->findAll();
        return new JsonResponse(["data"=> $products]);
    }
}