<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ApiResource(
 *     itemOperations={
 *         "get",
 *         "put",
 *         "delete",
 *         "countArticle"={
 *             "route_name"="countArticle",
 *             "swagger_context"={
 *                  "operationId"="getBookingItem",
 *                  "summary"="Retrieves details on a booking",
 *                  "parameters"= {
 *                      {
 *                          "name"="id",
 *                          "description"="Booking ID",
 *                          "default"="15000",
 *                          "in"="path",
 *                          "required"=true,
 *                          "type"="string"
 *                      }
 *                  },
 *                  "responses"={
 *                      "200"={
 *                          "description"="Results retrieved"
 *                      },
 *                      "404"={
 *                          "description"="Booking not found"
 *                      }
 *                  }
 *              }
 *         }
 *     },
 *    collectionOperations ={"get","post"}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $price;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Media", inversedBy="articles")
     */
    private $media;

    public function __construct()
    {
        $this->media = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|Media[]
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): self
    {
        if (!$this->media->contains($medium)) {
            $this->media[] = $medium;
        }

        return $this;
    }

    public function removeMedium(Media $medium): self
    {
        if ($this->media->contains($medium)) {
            $this->media->removeElement($medium);
        }

        return $this;
    }
}
