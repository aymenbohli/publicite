<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AnnonceRepository")
 */
class Annonce
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
    private $path;

    /**
     * @ORM\Column(type="datetime")
     */
    private $datein;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateout;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $place;

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

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getDatein(): ?\DateTimeInterface
    {
        return $this->datein;
    }

    public function setDatein(\DateTimeInterface $datein): self
    {
        $this->datein = $datein;

        return $this;
    }

    public function getDateout(): ?\DateTimeInterface
    {
        return $this->dateout;
    }

    public function setDateout(\DateTimeInterface $dateout): self
    {
        $this->dateout = $dateout;

        return $this;
    }

    public function getPlace(): ?int
    {
        return $this->place;
    }

    public function setPlace(?int $place): self
    {
        $this->place = $place;

        return $this;
    }
}
